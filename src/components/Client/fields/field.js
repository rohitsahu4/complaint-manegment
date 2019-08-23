import React from "react";
import Materialize from 'materialize-css';

import "@material/react-chips/dist/chips.css";
import { ChipSet, Chip } from '@material/react-chips';


export class Field extends React.Component {

  constructor(props) {
    super()
    this.state = {
      title: props.title,
      output: "",
    }

    this.fieldRef = React.createRef()
    this.fieldRef2 = React.createRef()
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    console.log(event)

    console.log(event)

  }

  render() {

    var Markup = <div></div>;
    if (this.props.type === "text") {
      Markup = <div className="input-field">
        <input ref={this.fieldRef} id={this.state.title} type="text" />
        <label className="blue-text" htmlFor={this.state.title}>{this.state.title}</label></div>
    }
    else if (this.props.type === "dates") {


      Markup =
        (<div className="row">
          <div className="input-field col s6">
            <input onChange={this.handleChange(this.value)} ref={this.fieldRef} id="StartDate" type="text" class="datepicker"></input>
            <label class="blue-text" htmlFor="StartDate">{this.props.title[0]}</label> </div>
          <div className="input-field col s6">
            <input ref={this.fieldRef2} id="EndDate" type="text" class="datepicker"></input>
            <label class="blue-text" htmlFor="EndDate">{this.props.title[0]}</label> </div>

        </div>)
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.datepicker');
        Materialize.Datepicker.init(elems);
      });

    }

    else if (this.props.type === "radiob") {

      Markup = <div style={{ margin: "15px 0" }} >

        <label className="blue-text" style={{ fontSize: "14px" }}>{this.props.title}</label>
        <div style={{ height: "15px" }}></div>
        <div className="row" >
          <label style={{ margin: "0 8px " }} >
            <input onChange={this.handleChange} value="1" name="group1" type="radio" />
            <span>1</span>
          </label>


          <label style={{ marginRight: "8px" }}>
            <input name="group1" type="radio" onChange={this.handleChange} value="2" />
            <span>2</span>
          </label>


          <label style={{ marginRight: "8px" }}>
            <input name="group1" type="radio" onChange={this.handleChange} value="3" />
            <span>3</span>
          </label>
          <label style={{ marginRight: "8px" }}>
            <input name="group1" type="radio" onChange={this.handleChange} value="4" />
            <span>4</span>
          </label>
          <label style={{ marginRight: "8px" }}>
            <input name="group1" type="radio" onChange={this.handleChange} value="5" />
            <span>5</span>
          </label>

        </div>

      </div>


    } else if (this.props.type === "chips") {
      Markup = <div style={{ margin: "15px 0" }} >  <label className="blue-text" style={{ margin: "15px 0", fontSize: "14px" }}>{this.props.title}</label>
        <div style={{ height: "15px" }}></div>
        <ChipSet
          filter
          handleSelect={(selectedChipIds) => this.setState(selectedChipIds)}
        >


          <Chip id={'FriendlyStaff'} label='Friendly Staff' />
          <Chip id={'Clienliness'} label='Clienliness' />
          <Chip id={'Location'} label='Location' />
          <Chip id={'Food'} label='Food' />

        </ChipSet></div>
    }
    else if (this.props.type === "multipleSelect") {
      Markup = <div style={{ margin: "15px 0" }} >
        <label className="blue-text" style={{ fontSize: "14px" }}>{this.props.title}</label>
        <div style={{ height: "15px" }}></div>
        <select multiple >

          <option value="1">Staff</option>
          <option value="2">Cleanliness</option>
          <option value="3">Food</option>
          <option value="4">Room Service</option>
          <option value="5">Other</option>
        </select></div>




      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        Materialize.FormSelect.init(elems);
      });
    }
    else if (this.props.type === "TextArea") {
      Markup = <div className="input-field"> <textarea id={this.props.title} className="materialize-textarea"></textarea>
        <label className="blue-text" htmlFor={this.props.title}>{this.props.title}</label></div>
    }
    else if (this.props.type === "ImgUpload") {
      Markup = <div className="row">

        <label style={{ fontSize: "14px" }} className="blue-text">{this.props.title}</label>
        <div className="file-field input-field">
          <div className="btn blue">
            <span>Browse</span>
            <input type="file" accept="image/*" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"
              placeholder="Upload file" />
          </div>
        </div>

      </div>
    }
    else if (this.props.type === "Switch") {
      Markup = <div className="switch" style={{ margin: "15px 0" }}>
        <label className="blue-text" style={{ fontSize: "14px" }}>{this.props.title}</label>
        <label>
          <div style={{ height: "15px" }}></div>
          <input type="checkbox" />
          <span className="lever"></span>
          Yes
        </label></div>

    }





    return (
      <div style={{ margin: "15px 0" }} >
        {Markup}</div>
    )
  }
}