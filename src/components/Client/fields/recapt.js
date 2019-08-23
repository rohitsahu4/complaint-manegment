import React from "react";
import firebase from "firebase"

export class Recap extends React.Component {
    constructor() {
        super()
        this.RecaptaInit = this.RecaptaInit.bind(this)

    }
    RecaptaInit = function () {
        firebase.auth().languageCode = 'en';
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('SendOtpBtn', {
            'size': 'invisible',
        });
    }
    render() {
        return (<div id="recaptcha-container"></div>)
    }
    componentDidMount() {

        this.RecaptaInit()
    }
}