import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../components/auth/useToken";

const Dashboard = () => {
	const [token] = useToken();
	const [Products, setProducts] = useState(null);

	useEffect(() => {
		axios
			.get("/api/products", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.catch((err) => {
				return alert(err);
			})
			.then((res) => setProducts(res.data));
	}, [token]);

	console.log(Products);

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
