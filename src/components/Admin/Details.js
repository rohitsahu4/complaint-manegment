import React from "react"
import "./Dashboard.css"
import Materialize from 'materialize-css';
import { db, storage } from "../../firebase"

export class Details extends React.Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            Details: []
        }

    }
    getDetails = () => {
        db.ref("complaints/" + this.props.match.params.id).once("value").then(res => {
            return this.setState({
                Details: res.val()
            })

        }).then(() => {
            Materialize.toast({ html: "Details Loaded", classes: "green" })
            this.setState({ loaded: true })
        })
            .catch((err) => {
                Materialize.toast({ html: "There was And Error loading The Data", classes: "red" })
                console.log(err)
            })
    }
    renderDetails = () => {
        if (this.state.loaded) {
            return (
                <div className="details">

                    <div className="col s10 m8">
                        <div className="col s12 m6   thin"><h6>Name :           </h6> <h5 className="blue-text">    {this.state.Details.name}</h5></div>
                        <div className="col s12 m6   thin"><h6>Stars  :         </h6> <h5 className="blue-text">    <i className="material-icons">{"stars ".repeat(this.state.Details.Stars)}</i></h5></div>
                        <div className="col s12 m6   thin"><h6>Start Date :     </h6> <h5 className="blue-text">    {this.state.Details.StartDate}</h5></div>
                        <div className="col s12 m6   thin"><h6>End Date :       </h6> <h5 className="blue-text"> {this.state.Details.EndDate}</h5></div>
                        <div className="col s10 m6   thin"><h6>Likes :          </h6> <h5 className="blue-text">    {this.state.Details.Likings}</h5></div>
                        <div className="col s10 m6   thin"><h6>Compliant Topic :</h6> <h5 className="blue-text">        {this.state.Details.ComplaintTopic}</h5></div>
                        <div className="col s10 m6   thin"><h6>Details :        </h6> <h5 className="blue-text">    {this.state.Details.Details}</h5></div>
                        <div className="col s10 m6   thin"><h6>PhoneNumber :    </h6> <h5 className="blue-text">    {this.state.Details.PhoneNumber ? <a href={"tel:" + this.state.Details.PhoneNumber} ><i className="material-icons" style={{ fontSize: "20px", paddingTop: "4px" }} >phone</i>{this.state.Details.PhoneNumber}</a> : "-"}</h5>
                        </div>
                    </div>

                    <img className="col center s10 m4 display-image" onClick={() => window.location = this.state.Details.imgUrl} alt="" src={this.state.Details.imgUrl} />

                </div>
            )
        }
        else {
            return (
                <div className="center">
                    <h4 className="green-text">Loading Please Wait</h4>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (<div>
            <nav>
                <div className="nav-wrapper blue">

                    <a className="brand-logo center">Complaint Details</a>
                    <ul id="nav" className="right ">
                        <li><a onClick={this.props.Logout}>Logout</a></li>
                    </ul>
                    <ul id="nav" className="left ">
                        <li><a onClick={() => { this.props.history.push("/Dashboard") }}>Go back</a></li>
                    </ul>
                </div>
            </nav>
            <div className="row">
                <div style={{ padding: "10px" }} className="card col s10 offset-s1  ">
                    {this.renderDetails()}
                </div>
            </div>
        </div>
        )
    }
    componentDidMount() {
        this.getDetails()
    }
}