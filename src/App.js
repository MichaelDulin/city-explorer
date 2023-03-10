import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./CityForm";
import Weather from "./Weather";
import Movie from "./Movie";
import "./App.css";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityDataName: "",
      cityData: [],
      lat: "",
      long: "",
      error: false,
      errorMsg: "",
      results: false,
      weatherData: [],
      movieData: []
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
      let getCityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);
      this.setState({
        results: true,
        cityData: getCityData.data[0],
        cityDataName: getCityData.data[0].display_name,
        lat: getCityData.data[0].lat,
        long: getCityData.data[0].lon,
        error: false,
      }, this.handleWeather);
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `ERROR: ${error.response.status}`,
      });
    }
  };

  handleWeather = async () => {
    this.handleMovies();
    let getWeatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.long}`);
    this.setState({
      weatherData: getWeatherData.data
    });
  };

  handleMovies = async () => {
    let getMovieData = await axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityName}`);
    this.setState({
      movieData: getMovieData.data
    });
  };

  

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.long}&zoom=11`;
    let forecast = this.state.weatherData.map(weather => {
      return(
        <Weather
          date={weather.date}
          description={weather.description}
        />
      )
    })

    let movies = this.state.movieData.map(movie => {
      return(
        <Movie
          title={movie.title}
          releasedDate={movie.released_on}
          img_url={movie.img_url}
        />
      )
    })

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
            <article className="renderedContent">
            <div className="results">
              <ul className="">
                <li>{this.state.cityDataName}</li>
                <li>Latitude: {this.state.lat}</li>
                <li>longitude: {this.state.long}</li>
              </ul>
              <img
                className="shadow bg body"
                src={mapURL}
                alt={this.state.cityName}
              ></img>
            </div>
              <div className="forecast">
              <h2>Local Weather</h2>
              {forecast}
              </div>
              <div className="movies">
                <h2>Local Movies</h2>
                {movies}
                </div>
            </article>
          )}
        <Footer />
      </>
    );
  }
}

/*
{this.state.error ? (
  <p>{this.state.errorMsg}</p>
) : this.state.cityDataName === undefined ? (
  <p />
) : (
  this.state.results && (
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
      <div>{cityWeatherValues}</div>
    </div>
  )
)}
*/

export default App;
