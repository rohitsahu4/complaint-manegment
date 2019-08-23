import React from "react";
export class TextField extends React.Component {


    constructor() {
        super()
        this.state = {
            error: true,
            value: ""
        }

    }
    onChangeText = (event) => {
        if (!(/[^a-zA-Z ]/.test(event.target.value))) {
            this.setState({ error: true })
            this.props.SendToParent(this.props.FieldName, event.target.value)
            this.props.SendToParent("error_on_" + this.props.title, false)
        }
        else {
            this.setState({
                error: false
            })
            this.props.SendToParent("error_on_" + this.props.title, true)
        }
    }


    render() {

        var Markup = (<div className="input-field">
            <input required className={this.state.error ? "" : "validate invalid"} onChange={this.onChangeText} maxLength="15" id={this.props.title} type="text" />
            <label className="blue-text" htmlFor={this.props.title}>{this.props.title}</label>
            <span className="helper-text" data-error="There are one or more invalid Charecters">No special char or Numbers allowed</span>
        </div>)
        return (
            Markup
        )

    }

}