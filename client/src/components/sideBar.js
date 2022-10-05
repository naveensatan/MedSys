import React from "react";
import { useUser } from "./auth/useUser";
import { useNavigate } from "react-router";
import avatar from "../img/user/user.png";

const SideBar = () => {
	const navigate = useNavigate();
	const { username, email } = useUser();

	return (
		<>
			<div className="logo">
				<h1>MedSys</h1>
			</div>
			<div className="sidebar-content">
				<div className="user-photo">
					<img src={avatar} alt="user avatar" />
				</div>
				<div className="user-details">
					<h3 className="user-details-username">{username}</h3>
					<p className="user-details-email">{email}</p>
				</div>
				<div className="user-changes btn-group-vertical">
					<button className="btn btn-primary">Settings</button>
					<button className="btn btn-danger" onClick={() => navigate("/login")}>
						Log Out
					</button>
				</div>
			</div>
		</>
	);
};

export default SideBar;
