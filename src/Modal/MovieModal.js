import React from "react";
import ReactDOM from "react-dom";
import classes from "./MovieModal.module.css";

const Modal = (props) => {
	const { backdrop_path, title, overview } = props.movieData;

	const closeHandler = () => {
		props.setShowData([]);
	};

	return (
		<div className={classes.modal}>
			<img
				src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
				alt={title}
				width='60%'
			/>

			<h2 className={classes.movieTitle}>{title}</h2>
			<p className={classes.movieDate}>{overview}</p>
			<span className={classes.closeBtn} onClick={closeHandler}>
				X
			</span>
		</div>
	);
};

const MovieModal = (props) => {
	const { setShowData, movie } = props;
	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Modal movieData={movie} setShowData={setShowData} />,
				document.getElementById("modal-root")
			)}
		</React.Fragment>
	);
};

export default MovieModal;
