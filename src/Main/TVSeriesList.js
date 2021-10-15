import React from "react";

import classes from "./TVSeriesList.module.css";

const TVSeriesList = (props) => {
  const { movie } = props;
  console.log(movie);
  const imageURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "https://www.cinemahalls.com/wp-content/uploads/2019/10/Picture-Not-Available-360x540.jpg";
  return (
    <div className={classes.movieContainer}>
      <img src={imageURL} alt={movie.title} width="100%" />

      <h2 className={classes.movieTitle}>{movie.title}</h2>
      <p className={classes.movieDate}>{movie.release_date}</p>
    </div>
  );
};

export default TVSeriesList;
