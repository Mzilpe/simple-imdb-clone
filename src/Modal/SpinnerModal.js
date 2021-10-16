import React from "react";
import ReactDOM from "react-dom";

import "./SpinnerModal.css";

const Backdrop = (props) => {
	return <div className='backdrop'></div>;
};

const Modal = (props) => {
	return (
		<div className='product-modal'>
			<div className='loader'></div>
			{/* <div className='lds-ripple'>
				<div></div>
				<div></div>
			</div> */}
		</div>
	);
};
const SpinnerModal = (props) => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Backdrop />,
				document.getElementById("backdrop-root")
			)}

			{ReactDOM.createPortal(<Modal />, document.getElementById("modal-root"))}
		</React.Fragment>
	);
};

export default SpinnerModal;
