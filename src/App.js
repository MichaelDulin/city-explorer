import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./CityForm";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      lat: "",
      long: "",
      reults: false
    };
  }

  handleInput = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let getCityData = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`
    );
    
    this.setState({
      results: true,
      cityData: getCityData.data[0],
      lat: getCityData.data[0].lat,
      long: getCityData.data[0].lon,
    });
  };

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.330062&zoom=12`;
    return (
      <>
        <Header />
        <CityForm
          className="mb-5 border p-5"
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          cityData={this.state.cityData}
        />
        <ul>Results:
          <li>City Name: {this.state.cityName}</li>
          <li>Latitude: {this.state.lat}</li>
          <li>longitude: {this.state.long}</li>
        </ul>
        <Footer />
      </>
    );
  }
}

export default App;
