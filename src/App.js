import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertMessage from "./components/AlertMessage";
import SearchForm from "./components/SearchForm";
import CityData from "./components/CityData";
import Map from "./components/Map";

import React, { Component } from "react";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchForm />
        <CityData />
        <Map />
        <AlertMessage />
        <Footer />
      </div>
    );
  }
}

export default App;
