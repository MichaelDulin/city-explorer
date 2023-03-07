import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
    };
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    console.log(res.data[0]);
    this.setState({ location: res.data[0] });
  };

  render() {
    return (
      <>
        <Header />
        <Form.group className="mb-5 border p-5">
          <Form.Label>
            Enter a location to find lattitude and longitude:{" "}
          </Form.Label>
          <Form.Control
            placeholder="Enter a location..."
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
          <button onClick={this.getLocation}>Explore!</button>
          {this.state.location.place_id && (
            <h2>The city is: {this.state.location.display_name}</h2>
          )}
        </Form.group>
        <Footer />
      </>
    );
  }
}

export default App;
