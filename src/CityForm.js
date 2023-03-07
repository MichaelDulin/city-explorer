import React from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";


class CityForm extends React.Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit} className="shadow bg body">
          <Form.Group className="mb-5 p-5">
            <Form.Label>Search by city name to find lattitude & longitude: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for city..."
              name="cityInput"
              onChange={this.props.handleInput}
              size="sm"
              required
              className="mb-5"
            />
            <Button className="p-2"type="submit">Explore!</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default CityForm;
