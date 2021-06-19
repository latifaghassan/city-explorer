
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
import Movies from "./components/Movies";

//------------------------------------------------
export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      MovieData: [],
      displayData: false,

      error: false,
      weatherData: [],

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

  getWeatherData = async () => {
    try {
      const myApiResponseW = await axios.get(
        `${process.env.REACT_APP_URL}/weather?lon=${this.state.lon}&lat=${this.state.lat}`
      );
      this.setState({
        weatherData: myApiResponseW.data,
      });
      // console.log("myApiResponseW",myApiResponseW);
    } catch {
      this.setState({
        error: true,
      });
    }
  };
  getMovieData = async () => {
    try {
      const myApiResponseM = await axios.get(
        `${process.env.REACT_APP_URL}/movies?searchQuery=${this.state.cityName}`
      );
      this.setState({
        MovieData: myApiResponseM.data,
        displayData: true,
      });
      // console.log("myApiResponseM",myApiResponseM);
    } catch {
      this.setState({
        error: true,
      });
    }
  };
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
      // console.log("axiosResponse",axiosResponse);

      this.getWeatherData();
      this.getMovieData();
    } catch {
      this.setState({
        error: true,
      });
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

              <Movies MovieData={this.state.MovieData} />
            </div>
          ))}

        <Footer />
      </div>
    );
  }
}
//------------------------------------------------
export default App;
