import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import weatherData from "./assets/weather.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertMessage from "./components/AlertMessage";
import SearchForm from "./components/SearchForm";
import CityData from "./components/CityData";
import Map from "./components/Map";
import Forcast from "./components/Forcast";

//------------------------------------------------
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      displayData: false,
      error: false,
      weatherData: "",

      lat: "",
      lon: "",
    };
  }
  //------------------------------------------------
  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };
  //------------------------------------------------

  getCityData = async (e) => {
    e.preventDefault();
    try {
      const axiosResponse = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.83c86caa48f11d093c8138a3a3fc4185&city=${this.state.cityName}&format=json`
      );

      this.setState({
        cityData: axiosResponse.data[0],
        lat: axiosResponse.data[0].lat,
        lon: axiosResponse.data[0].lon,
        error: false,
      });
      const myApiResponse = await axios.get(
        `${process.env.REACT_APP_URL}/weather?lon=${this.state.lon}&lat=${this.state.lat}`
      );

      this.setState({
        weatherData: myApiResponse.data,
        displayData: true,
      });
    } catch {
      this.setState({ error: true });
    }
  };
  //------------------------------------------------
  render() {
    return (
      <div>
        <Header />
        <SearchForm
          getCityData={this.getCityData}
          updateCityNameState={this.updateCityNameState}
        />

        {(this.state.error && <AlertMessage error={this.state.error} />) ||
          (this.state.displayData && (
            <div>
              <Map cityData={this.state.cityData} />

              <CityData cityData={this.state.cityData} />

              <Forcast weather={this.state.weatherData} />
            </div>
          ))}

        <Footer />
      </div>
    );
  }
}

//------------------------------------------------
export default App;
