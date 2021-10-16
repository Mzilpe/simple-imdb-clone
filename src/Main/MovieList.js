import React, { useState } from "react";
import MovieModal from "../Modal/MovieModal";
import Movie from "./Movie";

import classes from "./MovieList.module.css";

const MovieList = (props) => {
	const [showData, setShowData] = useState([]);
	const { movies } = props;

	return (
		<div className={classes.moviesSection}>
			{showData.length !== 0 ? (
				<MovieModal movie={showData} setShowData={setShowData} />
			) : (
				movies.map((movie) => (
					<Movie key={movie.id} movie={movie} setShowData={setShowData} />
				))
			)}
		</div>
	);
};

export default MovieList;
