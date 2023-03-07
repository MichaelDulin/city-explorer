import React from "react";
import { Form, Button } from "react-bootstrap";


class CityForm extends React.Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group>
            <Form.Label>Search by city name to find lattitude & longitude: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for city..."
              name="cityInput"
              onChange={this.props.handleInput}
              required
            />
            <Button type="submit">Explore!</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default CityForm;
