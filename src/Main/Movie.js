import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const { movie } = props;

  let title = movie.title ?? movie.name;
  let description = `${movie.vote_count} / ${movie.vote_average}`;
  const imageURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "https://www.cinemahalls.com/wp-content/uploads/2019/10/Picture-Not-Available-360x540.jpg";

  return (
    <div className={classes.movieContainer}>
      <img src={imageURL} alt={movie.title} width="100%" />

      <h2 className={classes.movieTitle}>{title}</h2>
      <p className={classes.movieDate}>{description}</p>
    </div>
  );
};

export default Movie;
