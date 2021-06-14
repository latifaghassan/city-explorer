import React, { Component } from "react";

export class Forcast extends Component {
  render() {
    return (
      <div>
        <p>{this.props.weatherData.Temperature}</p>
        <p>{this.props.weatherData.Weather}</p>
        <p>{this.props.weatherData.Date}</p>
      </div>
    );
  }
}

export default Forcast;
