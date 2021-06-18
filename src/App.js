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
      displayData: false,
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
      const axiosResponse = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.cityName}&format=json`
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
      this.setState({
        error: true,

              // MOVIES
              axios
                .get(
                  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${this.state.cityName}`
                )
                .then((reponseData) => {
                  this.setState({
                    weatherData: reponseData.data,
                    displayData: true,
                    alert: false,
                  });
                });
            });
          // weatherData: reponseData.data.results,
        });

  // --------------------------------------------------------------------------------------------

  render() {
    return (
      <div>
        <Header />
        {this.state.alert && <AlertMessage hasError={this.state.error} />}
        <SearchForm
          getCityData={this.getCityData}
          updateCityNameState={this.updateCityNameState}
        />
        {this.state.displayData && (
          <div>
            <Map cityData={this.state.cityData} />
            <CityData cityData={this.state.cityData} />
            <Forcast weather={this.state.weatherData} />
            <Movies movies={this.state.moviesData} />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
export default App;
