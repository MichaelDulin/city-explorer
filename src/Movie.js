import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component{

  

  render() {
    return(
        <Card style={{width:'18rem'}}>
            <Card.Title>{this.props.title}</Card.Title>
          <Card.Body>
            <Card.Img variant="top" src={this.props.img_url} />
            <Card.Text>{this.props.release_date}</Card.Text>
          </Card.Body>
        </Card>
    )
  }
}

export default Movie;