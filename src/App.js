import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./CityForm";
import "./App.css";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      lat: "",
      long: "",
      error: false,
      errorMsg: "",
      reults: false,
      weatherData: {},
    };
  }

  handleInput = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let getCityData = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`
      );

      this.setState({
        results: true,
        cityData: getCityData.data[0],
        cityDataName: getCityData.data[0].display_name,
        lat: getCityData.data[0].lat,
        long: getCityData.data[0].lon,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `ERROR: ${error.response.status}`
      })
    }
  };


  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.long}&zoom=11`;
    return (
      <>
        <Header />

        <CityForm
          className="mb-5 p-5 "
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          cityData={this.state.cityData}
        />

        {this.state.results && (
          <div className="results">
            <ul className="">
              <li>{this.state.cityDataName}</li>
              <li>Latitude: {this.state.lat}</li>
              <li>longitude: {this.state.long}</li>
            </ul>
            <img
              className="shadow bg body"
              src={mapURL}
              alt={this.state.cityDataName}
            ></img>
          </div>
        )}

        <Footer />
      </>
    );
  }
}

export default App;
