import React from "react";
import Movie from "./Movie";

import classes from "./MovieList.module.css";

const MovieList = (props) => {
	const { movies } = props;

	return (
		<div className={classes.moviesSection}>
			{movies.map((movie) => (
				<Movie key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default MovieList;
