import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../components/auth/useToken";
import { useNavigate } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	const navigate = useNavigate();
	const [token] = useToken();
	// eslint-disable-next-line
	const [Products, setProducts] = useState(null);
	const [Sales, setSales] = useState(null);
	const [pieData, setPieData] = useState(undefined);

	useEffect(() => {
		const getProducts = axios.get("/api/products", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const getSales = axios.get("/api/sales", {
			headers: { Authorization: `Bearer ${token}` },
		});

		axios
			.all([getProducts, getSales])
			.catch((err) => {
				if (err.response.status === 401) {
					return navigate("/login");
				}

				if (err.response.status === 404) {
					return alert("No records found...");
				}
			})
			.then((res) => {
				if (!res) {
					throw new Error("no response");
				}

				axios.spread((...data) => {
					const products = data[0];
					setProducts(data[0]);
					setSales(data[1]);

					console.log(products);

					const chartData = {
						labels: products.map((product) => product.productName),
						datasets: [
							{
								label: "Qty",
								data: Products.map((product) => product.qty),
								backgroundColor: [
									"rgba(255, 99, 132, 0.2)",
									"rgba(54, 162, 235, 0.2)",
									"rgba(255, 206, 86, 0.2)",
									"rgba(75, 192, 192, 0.2)",
									"rgba(153, 102, 255, 0.2)",
									"rgba(255, 159, 64, 0.2)",
								],
								borderColor: [
									"rgba(255, 99, 132, 1)",
									"rgba(54, 162, 235, 1)",
									"rgba(255, 206, 86, 1)",
									"rgba(75, 192, 192, 1)",
									"rgba(153, 102, 255, 1)",
									"rgba(255, 159, 64, 1)",
								],
								borderWidth: 1,
							},
						],
					};

					setPieData(chartData);
				});
			});
	}, [navigate, token]);

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Dashboard</h3>
			</div>
			<hr />
			<div className="page-content">
				<div className="dashboard-charts">
					<div id="dashboard-charts-pie">
						{pieData && <Pie data={pieData} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
