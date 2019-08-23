import React from "react";
import firebase from "firebase"
import { Recap } from "./recapt"
import Materialize from 'materialize-css';
export class OtpSwitch extends React.Component {
    constructor() {
        super()
        this.state = {
            value: false,
            BtnDisbled: true,
            Error: false,
            number: 0,
            DisableVerify: true
        }
        firebase.auth().languageCode = 'en';
    }
    onChangeOtp = (e) => {

        if (e.target.value.toString().length === 6)
            this.setState({
                DisableVerify: false
            })
        this.setState({
            otp: e.target.value
        })
    }
    VerifyOtp = () => {
        Materialize.toast({ html: 'Verifying OTP' })
        this.state.ConformationResult.confirm(this.state.otp).then(result => {
            this.props.SendToParent("DisableSubmit", false)
            this.props.SendToParent("PhoneNumber", this.state.number)
            this.setState({ optVerified: true })
            Materialize.toast({ html: 'Otp Verified', classes: "green" })
        }).catch(err => { Materialize.toast({ html: "An Error Occured While Verifying Otp", classes: "red" }) })

    }
    RenderOtpForm = () => {

        var Markup
        if (this.state.SmsSent)
            Markup = (<div className="input-field row">

                <div className="col s6">

                    <input required onChange={this.onChangeOtp} maxLength="10" id="OtpCode" type="number" />
                    <label className="blue-text" htmlFor="OtpCode">Enter OTP</label>
                </div>
                <div className="col s6">  <button disabled={this.state.DisableVerify} onClick={this.VerifyOtp} type="button" className="waves-effect waves-light btn white blue-text"> Verify</button></div>
            </div>)
        if (this.state.optVerified) {
            Markup = (<div className="input-field row">

                <h5 className="center green-text"> <i className="material-icons">check</i> Verified</h5>
            </div>)
        }

        return Markup
    }
    do = () => {
        this.SignInFirebase("+91" + this.state.number)
    }
    SignInFirebase = (number) => {
        Materialize.toast({ html: 'Sending Otp' })
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(number, appVerifier).then(
            ConformationResult => {
                this.setState({ ConformationResult: ConformationResult })
                this.setState({ SmsSent: true })
                Materialize.toast({ html: 'Otp Sent', classes: "green" })
            }

        ).catch(err => { Materialize.toast({ html: "An Error Occured While Sending Otp", classes: "red" }) })
    }

    onChangeText = (e) => {
        this.setState({ number: e.target.value })
        if (e.target.value.toString().length !== 10) {
            this.setState({ Error: true, errorText: "Enter full 10 digit number", BtnDisbled: true })

        }
        else {
            this.setState({ Error: false, errorText: "Ok", BtnDisbled: false })
        }
    }
    RenderNumberForm = () => {

        var Markup = (<div ><div className="input-field row">

            <div className="col s9">

                <input required className={this.state.Error ? "validate invalid" : ""} onChange={this.onChangeText} maxLength="10" id="NoForOtp" type="number" />
                <label className="blue-text" htmlFor="NoForOtp">Enter number</label>
                <span className="helper-text" data-error={this.state.errorText} data-success="OK"> </span>
            </div>
            <div className="col s3">  <button onClick={this.do} type="button" id="SendOtpBtn" disabled={this.state.BtnDisbled ? "disabled" : ""} className="waves-effect waves-light btn white blue-text"> Send Otp</button></div>
        </div>

            <Recap />
        </div>)



        if (this.state.value) {
            return Markup
        }

    }
    onSwitch = (e) => {
        this.state.value ? this.props.SendToParent("DisableSubmit", false) : this.props.SendToParent("DisableSubmit", true);
        this.setState({
            value: !this.state.value
        })
    }

    render() {
        var Markup = (<div><div className="switch row" style={{ margin: "15px 0" }}>
            <label className="blue-text col sm7" style={{ fontSize: "14px", margin: "15px 0" }}>{this.props.title}</label>
            <label className="col sm5">
                <div style={{ height: "15px" }}></div>
                <input onChange={this.onSwitch} type="checkbox" />
                <span className="lever"></span>
                {this.state.value ? "Yes" : "no"}
            </label></div>
            {this.RenderNumberForm()}
            {this.RenderOtpForm()}
        </div >)

        return Markup
    }

}