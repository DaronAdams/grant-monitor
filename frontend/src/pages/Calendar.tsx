import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


class CalApp extends Component {
  state = {
    date: new Date(),
  }

  onChange = (date: any) => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
