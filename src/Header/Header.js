import React from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { DISCOVER_TYPES } from "../Global/discover-types";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
	const { setSortBy, movieList, showTVSeries } = props;

	const selectSortBy = (val) => {
		setSortBy(val);
	};

	const onChangeHandler = (event) => {
		const keyword = event.target.value;
		const url = showTVSeries
			? `https://api.themoviedb.org/3/search/tv?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&query=${keyword}&page=1&include_adult=false`
			: `https://api.themoviedb.org/3/search/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&query=${keyword}&page=1&include_adult=false`;
		axios(url).then((res) => {
			movieList(res.data.results);
		});
	};

	const trendingData = () => {
		console.log("trend");
		const url = showTVSeries
			? "https://api.themoviedb.org/3/trending/tv/week?api_key=3a94078fb34b772a31d9a1348035bed7"
			: "https://api.themoviedb.org/3/trending/movie/week?api_key=3a94078fb34b772a31d9a1348035bed7";
		axios(url).then((res) => {
			movieList(res.data.results);
		});
	};

	return (
		<BrowserRouter>
			<div className={classes.headerSection}>
				<h1>Discover</h1>
				<nav className={classes.navSection}>
					{DISCOVER_TYPES.map((val) => (
						<NavLink
							className={classes.navLinks}
							activeClassName={classes.activeLink}
							to={`/${val.name.toLowerCase()}`}
							key={val.id}
							onClick={() => {
								return val.id === "trending"
									? trendingData()
									: selectSortBy(val.id);
							}}
						>
							{val.name}
						</NavLink>
					))}
				</nav>
				<div className={classes.searchContainer}>
					<span className={classes.searchSpan}>&#128269;</span>
					<label className={classes.searchLabel}>Search</label>
					<input
						className={classes.searchBar}
						type='text'
						onChange={onChangeHandler}
						placeholder='Search Here'
					/>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Header;
