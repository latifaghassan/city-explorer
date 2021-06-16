import React, { Component } from "react";

export class Movies extends Component {
  render() {
    return (
      <>
        {this.props.movies.map((item) => {
          return (
            <>
              <figure>
                <img src={item.img} />
                <figcaption>{item.title}</figcaption>
              </figure>
            </>
          );
        })}
      </>
    );
  }
}

export default Movies;
