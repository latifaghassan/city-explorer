import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertMessage from "./components/AlertMessage";
import SearchForm from "./components/SearchForm";
import Map from "./components/Map";
import Forcast from "./components/Forcast";
import CityData from "./components/CityData";
import Movies from "./components/Movies";

//---------------------------------------------------------------------------------------------

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      moviesData: [],
      displayData: false,
      error: "",
      weatherData: "",
      lat: "",
      lon: "",
      error: false,
    };
  }

  //---------------------------------------------------------------------------------------------

  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  //---------------------------------------------------------------------------------------------

  getCityData = async (e) => {
    e.preventDefault();
    try {
      // LOCATION
      await axios
        .get(
          `https://us1.locationiq.com/v1/search.php?key=pk.c16719e875dffaaab1b280dae491a8a9 &q=${this.state.cityName}&format=json`
        )
        .then((locationResponse) => {
          this.setState({
            cityData: locationResponse.data[0],
            lat: locationResponse.data[0].lat,
            lon: locationResponse.data[0].lon,
          });
        });
      //--------------------------------------------------------------------------------------------

      // WEATHER
      axios
        .get(
          `${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`
        )
        .then((weatherResponse) => {
          this.setState({
            weatherData: weatherResponse.data, // we target here the request data // this is the data that we got from the backend.
            displayData: true,
          });
        });
      //--------------------------------------------------------------------------------------------
      // MOVIES
      axios
        .get(
          `${process.env.MOVIE_API_KEY}/movies?&region=${this.state.cityName}`
        )
        .then((response) => {
          this.setState({
            weatherData: response.data.results,
            displayData: true,
          });
        });
    } catch {
      this.setState({
        error: true,
      });
    }
  };
  //---------------------------------------------------------------------------------------------

  render() {
    return (
      <div>
        <Header />
        <SearchForm
          getCityData={this.getCityData}
          updateCityNameState={this.updateCityNameState}
        />
        {(this.state.error && <AlertMessage />) ||
          (this.state.displayData && (
            <div>
              <Map cityData={this.state.cityData} />
              <CityData cityData={this.state.cityData} />
              <Forcast weather={this.state.weatherData} />
              <Movies movies={this.state.moviesData} />
            </div>
          ))}
        <Footer />
      </div>
    );
  }
}
export default App;

// 3000 for frontend (react)
// 3002 for backend
// they shouldn't be same.
