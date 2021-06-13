import React, { Component } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      displayData: false,
    };
  }

  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    const axiosResponse = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.cityName}&format=json`
    );

    console.log(axiosResponse);
    this.setState({
      cityData: axiosResponse.data[0],
      displayData: true,
    });
  };

  render() {
    return (
      <div>
        <Header />

        <Form onSubmit={this.getCityData} className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name:</Form.Label>
            <Form.Control
              onChange={this.updateCityNameState}
              type="text"
              placeholder="write a name of a city"
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button className="button" variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.displayData && (
          <div>
            <p className="city1">{this.state.cityData.display_name}</p>
            <p className="city">{this.state.cityData.lat}</p>
            <p className="city">{this.state.cityData.lon}</p>

            <img
              className="map"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`}
              alt=""
            />
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
