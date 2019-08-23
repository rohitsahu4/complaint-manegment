import React, {
  Component
} from 'react';
import { firebase } from "./firebase"
import { Homepage } from "./components/Admin/Login/Homepage"
import { Dashboard } from "./components/Admin/dashboard"
import { ClientApp } from "./components/Client/app"

import { Switch, Route } from "react-router-dom"
class App extends Component {
  checkFirebaseLogin = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loginStatus: user ? true : false })
    })
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={ClientApp} />
          <Route path="/Login" render={(props) => <Homepage {...props} checkFirebaseLogin={this.checkFirebaseLogin} />} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App;