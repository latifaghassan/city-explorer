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
      error: false,
      weatherData: "",
    };
  }

  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  // https://us1.locationiq.com/v1/search.php?key=localhost:3002/weather-data?searchQuery=Sydney&format=json

  // http://localhost:3002/weather-data?lat=-33.87&lon=151.21&searchQuery=Sydney&format=json

  getCityData = async (e) => {
    e.preventDefault();

    try {
      const axiosResponse = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.d36871f015649f915282f374cff76628&city=${this.state.cityName}&format=json`
      );

      const myApiResponse = process.env.REACT_APP_URL;
      const url = `${myApiResponse}/weather-data?lat=-33.87&lon=151.21&searchQuery=${this.cityName}`;

      const data = await axios.get(url);

      this.setState({
        cityData: axiosResponse.data[0],
        weatherData: myApiResponse.data.data[0],
        displayData: true,
        error: false,
      });
    } catch {
      this.setState({ error: true });
    }
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

              <Forcast
                temperature={this.state.weatherData.temp}
                weather={this.state.weatherData.weather.description}
                date={this.state.weatherData.datetime}
              />
            </div>
          ))}

        <Footer />
      </div>
    );
  }
}

export default App;
