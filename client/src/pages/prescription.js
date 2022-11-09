import React from "react";
import { useState, useEffect } from "react";
import { useToken } from "../components/auth/useToken";
import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Autocomplete,
	TextField,
	Button,
	IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const PrescriptionPage = () => {
	const [token] = useToken();
	const [Products, setProducts] = useState(null);
	const [tableRows, setTableRows] = useState([]);
	const [invoiceProducts, setInvoiceProducts] = useState([]);

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
					<>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label="spanning table">
								<TableHead>
									<TableRow>
										<TableCell align="center">Desc</TableCell>
										<TableCell align="center">Dosage</TableCell>
										<TableCell align="center">Qty.</TableCell>
										<TableCell align="center">Unit Price (Rs.)</TableCell>
										<TableCell align="center">Sum (Rs.)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tableRows.map((row, i) => {
										return (
											<TableRow data-key={i} key={i}>
												{row}
											</TableRow>
										);
									})}
									<TableRow>
										<TableCell align="center" colSpan={5}>
											<Button
												variant="contained"
												onClick={() => {
													setTableRows((currentRows) => [
														<AddView Products={Products} Rows={tableRows} />,
														...currentRows,
													]);
												}}
											>
												Add
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : (
					<h3>Loading...</h3>
				)}
			</div>
		</div>
	);
};

const AddView = ({ Products }, Rows) => {
	const [selectedProductName, setSelectedProductName] = useState(null);
	const [selectedDosage, setSelectedDosage] = useState(null);
	const [selectedProductObject, setSelectedProductObject] = useState({});
	const [givenQty, setGivenQty] = useState(null);
	const [sum, setSum] = useState(0);

	useEffect(() => {
		if (selectedProductName === null) return;

		const found = Products.find((p) => p.productName === selectedProductName);
		setSelectedProductObject(found);
	}, [selectedProductName]);

	useEffect(() => {
		if (selectedProductName === null || givenQty === null) return;

		setSum(
			(Number(selectedProductObject.unitPrice) * Number(givenQty)).toFixed(2)
		);
	}, [selectedProductName, givenQty]);

	return (
		<>
			<TableCell align="center">
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={Products.map((product) => product.productName)}
					sx={{ width: 200 }}
					renderInput={(params) => <TextField {...params} label="Product" />}
					onInputChange={(event, value) => setSelectedProductName(value)}
				/>
			</TableCell>
			<TableCell align="center">
				{selectedProductName && (
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={Array.of(selectedProductObject.dosage)}
						sx={{ width: 100 }}
						onInputChange={(event, value) => setSelectedDosage(value)}
						renderInput={(params) => <TextField {...params} label="Dosage" />}
					/>
				)}
			</TableCell>
			<TableCell align="center">
				{selectedProductName && (
					<TextField
						sx={{ width: 100 }}
						id="outlined-number"
						label="Qty"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(event) => setGivenQty(event.target.value)}
					/>
				)}
			</TableCell>
			<TableCell align="center">
				{selectedProductName &&
					Number(selectedProductObject.unitPrice).toFixed(2)}
			</TableCell>
			<TableCell align="center">
				{selectedProductName && givenQty && sum}
			</TableCell>
			<TableCell>
				<IconButton
					aria-label="done"
					size="medium"
					color="success"
					disabled={!selectedProductName || !selectedDosage || !givenQty}
				>
					<DoneIcon fontSize="inherit" color="success"></DoneIcon>
				</IconButton>
				<IconButton
					aria-label="close"
					size="medium"
					color="error"
					onClick={(event) => {
						let idx = event.currentTarget.parentNode.parentNode.getAttribute(
							"data-key"
						);
						console.log(Rows);
						removeRow(Rows, idx);
					}}
				>
					<CloseIcon fontSize="inherit" color="error"></CloseIcon>
				</IconButton>
			</TableCell>
		</>
	);
};

const removeRow = (rows, index) => {
	rows.slice(index, 1);
};

export default PrescriptionPage;
