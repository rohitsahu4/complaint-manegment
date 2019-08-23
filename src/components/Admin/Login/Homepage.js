import React from "react";
import { firebase } from "../../../firebase"
import Materialize from 'materialize-css';


export class Homepage extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: "",
            passwd: "",
            loginStatus: false,
            waiting: true,
        }
        Materialize.validate_field = function (object) {
            //do nothing
        }
    }

    onChangeUserid = (event) => {
        this.setState({
            userId: event.target.value
        })
    }
    onChangePasswd = (event) => {
        this.setState({
            passwd: event.target.value
        })
    }
    LoginWithFirebase = (userId, passwd) => {
        Materialize.toast({ html: "Logging in..." })
        firebase.auth().signInWithEmailAndPassword(userId, passwd)
            .then(res => {
                return Materialize.toast({ html: "Signed in!", classes: "green" })
            }).then(
                this.props.history.push("/Dashboard")
            )
            .catch(err => {
                Materialize.toast({ html: "An error ocurred During login" })
            })
    }
    SubmitHandler = (event) => {
        event.preventDefault()
        this.LoginWithFirebase(this.state.userId, this.state.passwd)

    }
    renderForm() {
        if (this.state.waiting) {
            return (<div className="row"><h5 className="center">Checking Login Status...</h5>
                <div className="progress col s6 offset-s3">
                    <div className="indeterminate"></div>
                </div></div>)
        }
        else if (!this.state.loginStatus) {
            return (<div className="row">
                <div className="card col x10  s10 m6 l4 offset-x1 offset-s1 offset-m3 offset-l4">
                    <form className=" col s10 offset-s1">
                        <div className="input-field ">
                            <input onChange={this.onChangeUserid} id="first_name" type="text" className="validate" />
                            <label htmlFor="first_name">User Id</label>
                        </div>
                        <div className="input-field">
                            <input onChange={this.onChangePasswd} id="Password" type="password" className="validate" />
                            <label htmlFor="Password">Password</label>
                        </div>
                        <div className="center" style={{ marginBottom: "10px" }}>
                            <button onClick={this.SubmitHandler} className="btn "> Login</button></div>
                    </form>
                </div>
            </div>)
        }
    }
    render() {
        return (<div className="App" >
            {this.renderForm()}
        </div>
        );
    }
    componentDidMount = () => {
        this.setState({ waiting: true })
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loginStatus: user ? true : false, waiting: false })
            if (user) {
                Materialize.toast({ html: "Logged In : Redirecting" })
                this.props.history.push("/Dashboard")
            }
        })
    }
}