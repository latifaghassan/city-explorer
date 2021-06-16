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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      displayData: false,
      alert: false,
      error: "",
      weatherData: "",
      moviesData: [],

      // lat: "",
      // lon: "",

      error: "",
    };
  }

  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    // JSON FILE API (WEATHER1)
    const axiosResponse = `https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.cityName}&format=json`;

    // MY API (WEATHER2)
    const myApiResponse = `${process.env.REACT_APP_URL}/weather`;

    // SITE API (WEATHER3)
    const weather2Url = `${myApiResponse}/weather2?searchQuery=${this.state.cityName}`;

    // (MOVIES)
    const movieURL = `${myApiResponse}/movies?searchQuery=${this.state.cityName}`;

    //-----------------------------------------------------------------/

    // we target here the request data // this is the data that we got from the backend.

    // JSON FILE API (WEATHER1)
    axios
      .get(axiosResponse)
      .then((data) => {
        this.setState({ cityData: axiosResponse.data[0], error: "" });
      })
      .catch((error) => {
        this.setState({ error: "There is an error" });
      });

    // MY API (WEATHER2)
    axios
      .get(myApiResponse)
      .then((data) => {
        this.setState({
          weatherData: myApiResponse.data,
          displayData: true,
          error: "",
        });
      })
      .catch((error) => {
        this.setState({ error: "There is an error" });
      });

    // SITE API (WEATHER3)
    axios
      .get(weather2Url)
      .then((data) => {
        this.setState({
          weatherData2: weather2Url.data.data[0],
          displayData: true,
          error: "",
        });
      })
      .catch((error) => {
        this.setState({ error: "There is an error" });
      });

    // (MOVIES)
    axios
      .get(movieURL)
      .then((data) => {
        this.setState({
          moviesData: movieURL.data.data,
          displayData: true,
          error: "",
        });
      })
      .catch((error) => {
        this.setState({ error: "There is an error" });
      });
  };

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
