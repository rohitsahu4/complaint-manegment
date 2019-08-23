import React from "react"
import { FullDashboard } from "./fullDashboard"
import { Switch, Route } from "react-router-dom"
import Materialize from 'materialize-css';
import { firebase } from "../../firebase"
import { Details } from "./Details"
export class Dashboard extends React.Component {
    checkFirebaseLogin = () => {

        setTimeout(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                console.log(user)
                if (user) {
                    return true
                } else {
                    return false
                }
            });
        }, 2000)




    }
    Logout = () => {
        firebase.auth().signOut()
            .then(() => {
                return Materialize.toast({ html: "Logged Out" })
            })
            .then(this.props.history.push("/Login"))
    }
    render() {
        return (

            <Switch>
                <Route path="/Dashboard" exact render={(props) => <FullDashboard {...props} checkFirebaseLogin={this.checkFirebaseLogin} Logout={this.Logout} />} />
                <Route path="/Dashboard/:id" exact render={(props) => <Details {...props} checkFirebaseLogin={this.checkFirebaseLogin} Logout={this.Logout} />} />

            </Switch>
        )
    }
}