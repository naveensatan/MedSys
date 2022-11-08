import React from "react";
import { useState, useEffect } from "react";
import { useToken } from "../components/auth/useToken";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PrescriptionPage = () => {
	const [token] = useToken();
	const [Products, setProducts] = useState(null);

	const invoiceProducts = [
		{
			productName: `Amoxcilline`,
			brandName: `Generic`,
			qty: 10,
			dosage: `1000mg`,
			unit: 50,
		},
		{
			productName: `Paracetomol`,
			brandName: `Panadol`,
			qty: 20,
			dosage: `500mg`,
			unit: 50,
		},
		{
			productName: `Loratadine`,
			brandName: `Generic`,
			qty: 15,
			dosage: `100mg`,
			unit: 50,
		},
	];

	const invoiceTotal = (productList) => {
		return productList
			.map(({ unit, qty }) => unit * qty)
			.reduce((sum, i) => sum + i, 0);
	};

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

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Prescription</h3>
			</div>
			<hr />
			<div className="page-content">
				{Products ? (
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={Products}
						sx={{ width: 300 }}
						getOptionLabel={(option) => option.productName}
						renderInput={(params) => (
							<TextField {...params} label="Search Product" />
						)}
					></Autocomplete>
				) : null}
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="spanning table">
						<TableHead>
							<TableRow>
								<TableCell align="center" colSpan={4}>
									Details
								</TableCell>
								<TableCell align="right">Price</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Desc</TableCell>
								<TableCell align="right">Qty.</TableCell>
								<TableCell align="right">Dosage</TableCell>
								<TableCell align="right">Unit Price</TableCell>
								<TableCell align="right">Sum</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{invoiceProducts.map((product) => (
								<TableRow key={product.productName}>
									<TableCell>{product.productName}</TableCell>
									<TableCell align="right">{product.qty}</TableCell>
									<TableCell align="right">{product.dosage}</TableCell>
									<TableCell align="right">{product.unit}</TableCell>
									<TableCell align="right">
										{product.unit * product.qty}
									</TableCell>
								</TableRow>
							))}

							<TableRow>
								<TableCell colSpan={4}>Total</TableCell>
								<TableCell align="right">
									{invoiceTotal(invoiceProducts)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default PrescriptionPage;
