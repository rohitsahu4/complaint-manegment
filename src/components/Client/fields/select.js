import React from "react";
import Materialize from 'materialize-css';

export class Select extends React.Component {

  handlChange = (event) => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.props.SendToParent(this.props.FieldName, value)
  }
  render() {


    var Markup = (<div style={{ margin: "15px 0" }} >
      <label className="blue-text" style={{ fontSize: "14px" }}>{this.props.title}</label>
      <div style={{ height: "15px" }}></div>
      <select onChange={this.handlChange} multiple >

        <option value="Staff ">Staff</option>
        <option value="Cleanliness ">Cleanliness</option>
        <option value="Food ">Food</option>
        <option value="Room Service ">Room Service</option>
        <option value="Other ">Other</option>
      </select></div>)




    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      Materialize.FormSelect.init(elems, {});
    });

    return (Markup)

  }
}
