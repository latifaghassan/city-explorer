import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export class Movies extends Component {
  render() {
    return (
      <div>
        {this.props.MovieData.map((movieObj) => {
          return (
            <div className="movies">
              <ListGroup>
                <ListGroup.Item variant="info">
                  Title: {movieObj.title}
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Overview: {movieObj.overview}
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Average_votes: {movieObj.vote_average}
                </ListGroup.Item>
                <img
                  className="map"
                  src={movieObj.img}
                  alt=""
                  width="50%"
                  height="40%"
                />

                <ListGroup.Item variant="info">
                  Popularity: {movieObj.popularity}
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Released_on: {movieObj.release_date}
                </ListGroup.Item>
              </ListGroup>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Movies;
