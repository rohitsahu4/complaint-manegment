import React from "react";
import Materialize from 'materialize-css';


export class Dates extends React.Component {
    constructor() {
        super()
        this.state = {
            endDateDisabled: true
        }

    }
    setDateConstraints = () => {
        this.setState({
            minDateStart: this.dateConverter(this.state.today),
            minDateEnd: this.dateConverter(this.state.dayaftertoday)
        })
    }
    dateConverter = (indate) => {
        var dtToday = new Date(indate);

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        return maxDate
    }
    toDateString = (inputObj) => {
        return (inputObj.getDay() + "/" + (inputObj.getMonth() + 1) + "/" + inputObj.getFullYear())
    }
    onSelectStart = (dateObj) => {
        var date = this.toDateString(dateObj)
        this.props.SendToParent(this.props.FieldName[0], date)


        this.state.instance2[0].destroy()
        let elem2 = document.querySelectorAll('.datepicker#EndDate');
        let newInstance = Materialize.Datepicker.init(elem2, {
            onSelect: this.onSelectEnd,
            minDate: dateObj,
            maxDate: new Date()
        });
        this.setState({ instance2: newInstance, endDateDisabled: false })
    }
    onSelectEnd = (dateObj) => {
        var date = this.toDateString(dateObj)
        this.props.SendToParent(this.props.FieldName[1], date)


    }

    render() {


        var Markup =
            (<div className="row">
                <div className="input-field col s6">
                    <input required id="StartDate" type="text" className="datepicker"></input>
                    <label className="blue-text" htmlFor="StartDate">{this.props.title[0]}</label> </div>
                <div className="input-field col s6">
                    <input disabled={this.state.endDateDisabled} required ref={this.fieldRef2} id="EndDate" type="text" className="datepicker  " data-success="right"  ></input>
                    <label className="blue-text" htmlFor="EndDate">{this.props.title[1]}</label>
                    <span className="helper-text" data-error="" data-success="">{this.state.endDateDisabled ? "Select Start Date First" : ""}</span>
                </div>

            </div>)

        return (
            Markup

        )
    }
    componentDidMount() {
        this.setDateConstraints(new Date())
        var elem1 = document.querySelectorAll('.datepicker#StartDate');
        var elem2 = document.querySelectorAll('.datepicker#EndDate');

        Materialize.Datepicker.init(elem1, {
            onSelect: this.onSelectStart,
            maxDate: new Date()
        });


        var instance2 = Materialize.Datepicker.init(elem2, {
            onSelect: this.onSelectEnd,
            maxDate: new Date()
        });
        this.setState({ instance2: instance2 })
    }
}