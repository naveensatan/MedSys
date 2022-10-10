import React, { useState } from "react";
import { useUser } from "./auth/useUser";
import { useNavigate } from "react-router";

const Topbar = () => {
	const navigate = useNavigate();
	const { username } = useUser();
	const [showUser, showUserToggle] = useState(false);

	return (
		<div className="topbar">
			<div className="logo">
				<h1>MedSys</h1>
			</div>
			<div className="topbar-content" onClick={() => showUserToggle(!showUser)}>
				<div className="topbar-user">
					<h3>{username}</h3>
				</div>
				<div className="notifications">
					<i className="fa-regular fa-bell"></i>
				</div>
			</div>
			{showUser ? (
				<div className="user-dropdown">
					<div className="user-adropdown-links">
						<button className="user-dropdown-link btn btn-light">
							Profile
						</button>
						<button
							className="user-dropdown-link btn btn-light"
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/login");
							}}
						>
							Logout
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Topbar;
