import React, { Component } from "react";

export class CityData extends Component {
  render() {
    return (
      <div>
        <p className="display_name">{this.props.cityData.display_name}</p>
        <p className="lat">{this.props.cityData.lat}</p>
        <p className="lon">{this.props.cityData.lon}</p>
      </div>
    );
  }
}

export default CityData;
