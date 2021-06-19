import React, { Component } from "react";

export class CityData extends Component {
  render() {
    return (
      <div>
        <p className="display_name">
          {" "}
          City Name :{this.props.cityData.display_name}
        </p>
        <p className="lat">Lat : {this.props.cityData.lat}</p>
        <p className="lon"> Lon :{this.props.cityData.lon}</p>
      </div>
    );
  }
}

export default CityData;
