import React from "react";

import classes from "./NoDataFound.module.css";

const NoDataFound = (props) => {
	return (
		<div className={classes.noDataSection}>
			<h1 className={classes.data}>Sorry no data Found...</h1>
		</div>
	);
};

export default NoDataFound;
