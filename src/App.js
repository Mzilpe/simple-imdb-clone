import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header/Header";
import Filter from "./DiscoverSection/Filter";
import MovieList from "./Main/MovieList";

import NoDataFound from "./Extras/NoDataFound";
import SpinnerModal from "./Modal/SpinnerModal";

function App() {
	const [sortBy, setSortBy] = useState("popularity.desc");
	const [movieList, setMovieList] = useState([]);
	const [showTVSeries, setshowTVSeries] = useState(false);
	const [showLoader, setShowLoader] = useState(true);
	const [noDataFound, setNoDataFound] = useState(false);

	useEffect(() => {
		setShowLoader(true);
		let url = showTVSeries
			? `https://api.themoviedb.org/3/discover/tv?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
			: `https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

		axios(url).then((res) => {
			if (res.data.results.length === 0) {
				setNoDataFound(true);
			}
			setMovieList(res.data.results);
		});
		setShowLoader(false);
	}, [sortBy, showTVSeries]);

	return (
		<>
			<div className='App'>
				<section className='main-container'>
					<Header
						setSortBy={setSortBy}
						showTVSeries={showTVSeries}
						movieList={setMovieList}
						setNoDataFound={setNoDataFound}
					/>
					{movieList.length === 0 || showLoader ? (
						noDataFound ? (
							<NoDataFound />
						) : (
							<SpinnerModal />
						)
					) : (
						<MovieList movies={movieList} />
					)}
				</section>
				<Filter
					setshowTVSeries={setshowTVSeries}
					setMovieList={setMovieList}
					showTVSeries={showTVSeries}
					sortBy={sortBy}
					setNoDataFound={setNoDataFound}
				/>
			</div>
		</>
	);
}

export default App;
