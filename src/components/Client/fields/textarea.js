import React from "react";

export class TextArea extends React.Component {
    onChangeText = (event) => {
        this.props.SendToParent(this.props.FieldName, event.target.value)
    }
    render() {




        var Markup = (<div className="input-field">
            <textarea className="materialize-textarea" required onChange={this.onChangeText} id={this.props.title} type="text" />
            <label className="blue-text" htmlFor={this.props.title}>{this.props.title}</label>
        </div>)
        return (
            Markup
        )

    }

}