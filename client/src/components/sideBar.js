import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "./auth/useUser";

const SideBar = () => {
	const navigate = useNavigate();
	const user = useUser();

	return (
		<div className="sidebar">
			<div className="sidebar-section">
				<p className="sidebar-category">NAVIGATION</p>
				<button
					className="nav-button btn btn-light"
					onClick={() => navigate("/")}
				>
					<i className="fa-solid fa-gauge-high"></i>
					<span>Dashboard</span>
				</button>
				<button
					className="nav-button btn btn-light"
					onClick={() => navigate("/manage-stocks")}
				>
					<i className="fa-solid fa-prescription-bottle-medical"></i>
					<span>Stocks</span>
				</button>
				<button className="nav-button btn btn-light">
					<i className="fa-solid fa-microscope"></i>
					<span>Reports</span>
				</button>
				<button
					className="nav-button btn btn-light"
					onClick={() => {
						if (user.admin) {
							return navigate("/users");
						}

						alert("Not authorized: Only an admin can view users!");
					}}
				>
					<i className="fa-solid fa-users"></i>
					<span>Users</span>
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
