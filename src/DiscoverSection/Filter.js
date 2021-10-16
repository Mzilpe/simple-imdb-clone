import axios from "axios";
import React, { Fragment, useState } from "react";
import { GENRE } from "../Global/genre";
import { YEARS } from "../Global/years";
import { STARS } from "../Global/stars";
import classes from "./Filter.module.css";

import SpinnerModal from "../Modal/SpinnerModal";

const Filter = (props) => {
	const [showLoader, setShowLoader] = useState(false);
	const [startDate, setStartDate] = useState("2000-01-01");
	const {
		setshowTVSeries,
		showTVSeries,
		setMovieList,
		sortBy,
		setNoDataFound,
	} = props;

	const onChangeHandler = (event) => {
		event.target.value === "M" ? setshowTVSeries(false) : setshowTVSeries(true);
	};

	const onChangeGenreHandler = (event) => {
		setShowLoader(true);
		const genreId = event.target.value;
		const url = showTVSeries
			? `https://api.themoviedb.org/3/discover/tv?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`
			: `https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`;
		axios(url).then((res) => {
			if (res.data.results.length === 0) {
				setNoDataFound(true);
			}
			setMovieList(res.data.results);
		});
		setShowLoader(false);
	};

	const onChangeStartYear = (event) => {
		event.preventDefault();
		const year = event.target.value;
		const fromDate = `${year}-01-01`;
		setStartDate(fromDate);
	};

	const onChangeEndYear = (event) => {
		setShowLoader(true);
		const year = event.target.value;
		const toDate = `${year}-01-01`;
		const url = showTVSeries
			? `https://api.themoviedb.org/3/discover/tv?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&release_date.gte=${startDate}&release_date.lte=${toDate}&with_watch_monetization_types=flatrate`
			: `https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&release_date.gte=${startDate}&release_date.lte=${toDate}&with_watch_monetization_types=flatrate`;

		axios(url).then((res) => setMovieList(res.data.results));
		setShowLoader(false);
	};

	const starClickHandler = (value) => {
		console.log(value);
	};

	return (
		<Fragment>
			{showLoader && <SpinnerModal />}
			<aside className={classes.filterSection}>
				<h1>Discover Options</h1>
				<form className={classes.formSection}>
					<label className={classes.filterLabel}>TYPE</label>
					<select
						className={classes.selectSection}
						defaultValue={"M"}
						onChange={onChangeHandler}
					>
						<option value='M'>Movies</option>
						<option value='T'>TV Series</option>
					</select>
					<label className={classes.filterLabel}>GENRE</label>
					<select
						className={classes.selectSection}
						defaultValue='28'
						onChange={onChangeGenreHandler}
					>
						{GENRE.map((gen) => (
							<option key={gen.id} value={gen.id}>
								{gen.name}
							</option>
						))}
					</select>
					<label className={classes.filterLabel}>YEAR</label>
					<section className={classes.yearFilterSection}>
						<select
							className={classes.selectSection}
							defaultValue='2000'
							onChange={onChangeStartYear}
						>
							{YEARS.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
						<label className={classes.filterLabel}>-</label>
						<select
							className={classes.selectSection}
							defaultValue='2019'
							onChange={onChangeEndYear}
						>
							{YEARS.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</section>
					<section className={classes.ratingsSection}>
						<label className={classes.filterLabel}>Ratings</label>
						<span className={classes.starContainer}>
							{STARS.map((star) => (
								<img
									key={star.id}
									className={classes.star}
									src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/star_2b50.png'
									alt='rating star'
									onClick={() => starClickHandler(star.value)}
								/>
							))}
						</span>
					</section>
				</form>
			</aside>
		</Fragment>
	);
};

export default Filter;
