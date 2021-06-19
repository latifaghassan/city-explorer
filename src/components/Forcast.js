import React, { Component } from "react";

export class Forcast extends Component {
  render() {
    return (
      <>
        {this.props.weather.map((weatherObj) => {
          return (
            <>
              <p className="forcast"> {weatherObj.description}</p>
              <p className="forcast"> {weatherObj.date}</p>
            </>
          );
        })}
      </>
    );
  }
}

export default Forcast;
