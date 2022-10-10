import React from "react";
// import { useState } from "react";

const SideBar = () => {
	// const [currentPage, switchPage] = useState("");
	// const hostUrl = `http://localhost:3001/`;

	// const pages = [`dashboard`, `stocks`, `reports`];

	// console.log(window.location.href);

	return (
		<div className="sidebar">
			<div className="sidebar-section">
				<p className="sidebar-category">NAVIGATION</p>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-gauge-high"></i>
					<span>Dashboard</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-prescription-bottle-medical"></i>
					<span>Stocks</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-microscope"></i>
					<span>Reports</span>
				</button>
			</div>
			<div className="sidebar-section">
				<p className="sidebar-category">DISPENSARY</p>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-prescription"></i>
					<span>Prescription</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-syringe"></i>
					<span>Pathology</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-stamp"></i>
					<span>Certificates</span>
				</button>
			</div>
			<div className="sidebar-section">
				<p className="sidebar-category">PATIENTS</p>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-hospital-user"></i>
					<span>Queue</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-id-card"></i>
					<span>New</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-hand-holding-medical"></i>
					<span>Manage</span>
				</button>
			</div>
		</div>
	);
};

export default SideBar;
