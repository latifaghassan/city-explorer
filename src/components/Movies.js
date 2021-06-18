import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

export class Movies extends Component {
  render() {
    return (
      <>
        {this.props.movies.map((value) => {
          return (
            <>
              <ListGroup>
                <ListGroup.Item variant="info">
                  Description: {value.description}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  Date: {value.date}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  Title: {value.title}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  Overview: {value.overview}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  {" "}
                  Votes Average: {value.vote_average}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  Total Votes: {value.vote_count}
                </ListGroup.Item>

                <Image
                  src={`http://image.tmdb.org/t/p/w500${value.poster_path} thumbnail`}
                />

                <ListGroup.Item variant="info">
                  Popularity: {value.popularity}
                </ListGroup.Item>

                <ListGroup.Item variant="info">
                  Released Date: {value.release_date}
                </ListGroup.Item>
              </ListGroup>
            </>
          );
        })}
      </>
    );
  }
}

export default Movies;

// <img src={item.poster_path} alt="1" />
//<figcaption>{item.title}</figcaption>
