import React from "react";
import Card from 'react-bootstrap/Card';

class Weather extends React.Component{

  render(){
    return(
      <Card style={{width:'18rem'}}>
        <Card.Title>{this.props.date}</Card.Title>
        <Card.Text>{this.props.description}</Card.Text>
      </Card>
    );
  }
}

export default Weather;