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
      weatherData: "",
      moviesData: "",
      lat: "",
      lon: "",

      displayData: false,

      hasError: "",
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
          `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.cityName}&format=json`
        )
        .then((reponseData) => {
          this.setState({
            cityData: reponseData.data[0],
            lat: reponseData.data[0].lat,
            lon: reponseData.data[0].lon,
          });

          //   // WEATHER
          axios

            .get(
              `${process.env.REACT_APP_URL}/weather?&lat=${this.state.lat}&lon=${this.state.lon}`
            )

            .then((reponseData) => {
              this.setState({
                weatherData: reponseData.data,
                // displayData: true,
                // we target here the request data // this is the data that we got from the backend
                alert: false,
              });
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

      //   //--------------------------------------------------------------------------------------------
    } catch (error) {
      this.setState({
        hasError: error.message,
        alert: true,
      });
    }
  };
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

// 3000 for frontend (react)
// 3002 for backend
// they shouldn't be same.
