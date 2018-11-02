import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";



// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class TrainingCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.getTrainingsfromApi();
  }

  getTrainingsfromApi = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(resData => {
        var dateArray = [];
        for (var i=0; i < resData.length; i++){
          dateArray.push({
          start: new Date(resData[i].date),
          // Converting minutes to milliseconds and adds to start date to calculate end date
          end: new Date(resData[i].date + resData[i].duration*60000),
          title: resData[i].activity
        });
      }
      this.setState({events: dateArray});
    })
  }

 


  render() {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

    return (
   
       <BigCalendar
        events={this.state.events}
        views={allViews}
        step={30}
        showMultiDayTimes
        defaultDate={new Date()}
        style={{ height: "500px", margin: "50px 30px" }}
      />
    )
  }
}