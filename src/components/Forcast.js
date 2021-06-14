import React, { Component } from "react";

export class Forcast extends Component {
  render() {
    return (
      <div>
        <p>{this.props.weatherData.temperature}</p>
        <p>{this.props.weatherData.wather}</p>
        <p>{this.props.weatherData.date}</p>
      </div>
    );
  }
}

export default Forcast;
