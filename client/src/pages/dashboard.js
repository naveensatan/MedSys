import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../components/auth/useToken";
import { useNavigate } from "react-router";

const Dashboard = () => {
	const navigate = useNavigate();
	const [token] = useToken();
	// eslint-disable-next-line
	const [Products, setProducts] = useState(null);

	useEffect(() => {
		axios
			.get("/api/products", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.catch((err) => {
				if (err.response.status === 401) {
					return navigate("/login");
				}

				if (err.response.status === 404) {
					return alert("No products found...");
				}
			})
			.then((res) => {
				res && setProducts(res.data);
			});
	}, [token]);

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Dashboard</h3>
			</div>
			<hr />
			<div className="page-content">
				<div className="dashboard-charts">
					<div id="dashboard-charts-pie"></div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
