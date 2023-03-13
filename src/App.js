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
      movieData: [],
    };
  }

  handleInput = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let state;
    let cityUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`
    try {
      state = await axios.get(cityUrl);
      this.setState(
        {
          results: true,
          cityData: state.data[0],
          cityDataName: state.data[0].display_name,
          lat: state.data[0].lat,
          long: state.data[0].lon,
          error: false,
        },
        this.handleWeather
      );
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `ERROR: ${error.response.status}`,
      });
    }
  };

  handleWeather = async () => {
    this.handleMovies();
    let weatherUrl = await axios.get(
      `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.long}`
    );
    let getWeather;
    try{
      getWeather = await axios.get(weatherUrl);
      this.setState({
        weatherData: getWeather.data
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`
      })
    }
    console.log(weatherUrl);
  }

  handleMovies = async () => {
    let movieUrl = await axios.get(
      `${process.env.REACT_APP_SERVER}/movie?city=${this.state.cityName}`
    );
    let getMovies;
    try{
      getMovies = await axios.get(movieUrl);
      this.setState({
        movieData: getMovies.data
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`
      })
    }
  }


  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.long}&zoom=11`;
    let forecast = this.state.weatherData.map((weather) => {
      return <Weather date={weather.date} description={weather.description} />;
    });

    let movies = this.state.movieData.map((movie) => {
      return (
        <Movie
          title={movie.title}
          img_url={movie.img_url}
          released_on={movie.released_on}
        />
      );
    });

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
            <div className="results1">
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
            <div className="results2">
              <div className="forecast">
                <h2>Local Weather</h2>
                {forecast}
              </div>
              <div className="movies">
                <h2>Local Movies</h2>
                {movies}
              </div>
            </div>
          </article>
        )}
        <Footer />
      </>
    );
  }
}

export default App;
