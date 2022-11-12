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
	Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { randomId } from "@mui/x-data-grid-generator";

const PrescriptionPage = () => {
	const [token] = useToken();
	const [Products, setProducts] = useState(null);
	const [selectedProductName, setSelectedProductName] = useState(null);
	const [selectedProductObject, setSelectedProductObject] = useState({});
	const [selectedDosage, setSelectedDosage] = useState(null);
	const [givenQty, setGivenQty] = useState(0);
	const [rows, setRow] = useState([]);

	const handleCancel = (rowId) => {
		let updatedRows = rows.filter((row) => {
			return row.id !== rowId;
		});

		setRow(updatedRows);
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

	useEffect(() => {
		if (selectedProductName == null) return;
		const obj = Products.find(
			(product) => product.productName === selectedProductName
		);
		setSelectedProductObject(obj);
	}, [selectedProductName]);

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Prescription</h3>
			</div>
			<hr />
			<div className="page-content">
				{Products ? (
					<>
						<Stack
							spacing={2}
							sx={{
								backgroundColor: "#d4d3d333",
								padding: "2rem",
								borderRadius: "1rem",
							}}
						>
							<Autocomplete
								disablePortal
								size="small"
								id="combo-box-demo"
								options={Products.map((product) => product.productName)}
								sx={{ width: 200 }}
								renderInput={(params) => (
									<TextField {...params} label="Choose product" />
								)}
								onChange={(e, value) => setSelectedProductName(value)}
							/>
							<>
								<Autocomplete
									disablePortal
									disabled={!selectedProductName}
									size="small"
									id="combo-box-demo"
									options={Array.of(selectedProductObject.dosage)}
									sx={{ width: 200 }}
									renderInput={(params) => (
										<TextField {...params} label="Choose dosage" />
									)}
									onChange={(e, value) => setSelectedDosage(value)}
								/>
								<TextField
									label={"Qty"}
									type={"number"}
									required
									variant="standard"
									disabled={!selectedProductName || !selectedDosage}
									onChange={(e) => setGivenQty(e.target.value)}
								></TextField>
							</>

							<Button
								variant="contained"
								color="success"
								size="medium"
								disabled={
									!selectedProductName || !selectedDosage || givenQty < 1
								}
								sx={{ width: "50%", alignSelf: "center" }}
								onClick={() => {
									setRow((currentRows) => [
										...currentRows,
										{
											id: randomId(),
											productName: selectedProductObject.productName,
											dosage: selectedDosage,
											qty: givenQty,
											unitPrice: selectedProductObject.unitPrice,
											sum: calcSum(selectedProductObject.unitPrice, givenQty),
										},
									]);
								}}
							>
								Add
							</Button>
						</Stack>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} aria-label="spanning table">
								<TableHead>
									<TableRow>
										<TableCell align="center">Desc</TableCell>
										<TableCell align="center">Dosage</TableCell>
										<TableCell align="center">Qty.</TableCell>
										<TableCell align="center">Unit Price (Rs.)</TableCell>
										<TableCell align="center">Sum (Rs.)</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows &&
										rows.map((row, i) => {
											return (
												<TableRow idx={row.id} key={i}>
													<TableCell align="center">
														{row.productName}
													</TableCell>
													<TableCell align="center">{row.dosage}</TableCell>
													<TableCell align="center">{row.qty}</TableCell>
													<TableCell align="center">{row.unitPrice}</TableCell>
													<TableCell align="center">{row.sum}</TableCell>
													<TableCell align="center">
														<IconButton>
															<EditIcon></EditIcon>
														</IconButton>
														<IconButton onClick={() => handleCancel(row.id)}>
															<CloseIcon></CloseIcon>
														</IconButton>
													</TableCell>
												</TableRow>
											);
										})}
									{rows.length !== 0 && (
										<>
											<TableRow>
												<TableCell colSpan={3}></TableCell>
												<TableCell
													sx={{ fontWeight: "bold", fontSize: "1.2em" }}
												>
													Total
												</TableCell>
												<TableCell
													sx={{ fontWeight: "bold", fontSize: "1.2em" }}
													align="center"
												>
													{calcTotal(rows)}
												</TableCell>
												<TableCell></TableCell>
											</TableRow>
										</>
									)}
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

const calcSum = (unitPrice, qty) => {
	return (unitPrice * qty).toFixed(2);
};

const calcTotal = (items) => {
	let total = 0;
	// eslint-disable-next-line
	items.map((item) => {
		total = total + Number(item.sum);
	});
	return total.toFixed(2);
};

// const AddView = ({ Products }, Rows) => {
// 	const [selectedProductName, setSelectedProductName] = useState(null);
// 	const [selectedDosage, setSelectedDosage] = useState(null);
// 	const [selectedProductObject, setSelectedProductObject] = useState({});
// 	const [givenQty, setGivenQty] = useState(null);
// 	const [sum, setSum] = useState(0);

// 	useEffect(() => {
// 		if (selectedProductName === null) return;

// 		const found = Products.find((p) => p.productName === selectedProductName);
// 		setSelectedProductObject(found);
// 	}, [selectedProductName]);

// 	useEffect(() => {
// 		if (selectedProductName === null || givenQty === null) return;

// 		setSum(
// 			(Number(selectedProductObject.unitPrice) * Number(givenQty)).toFixed(2)
// 		);
// 	}, [selectedProductName, givenQty]);

// 	return (
// 		<>
// 			<TableCell align="center">
// 				<Autocomplete
// 					disablePortal
// 					id="combo-box-demo"
// 					options={Products.map((product) => product.productName)}
// 					sx={{ width: 200 }}
// 					renderInput={(params) => <TextField {...params} label="Product" />}
// 					onInputChange={(event, value) => setSelectedProductName(value)}
// 				/>
// 			</TableCell>
// 			<TableCell align="center">
// 				{selectedProductName && (
// 					<Autocomplete
// 						disablePortal
// 						id="combo-box-demo"
// 						options={Array.of(selectedProductObject.dosage)}
// 						sx={{ width: 100 }}
// 						onInputChange={(event, value) => setSelectedDosage(value)}
// 						renderInput={(params) => <TextField {...params} label="Dosage" />}
// 					/>
// 				)}
// 			</TableCell>
// 			<TableCell align="center">
// 				{selectedProductName && (
// 					<TextField
// 						sx={{ width: 100 }}
// 						id="outlined-number"
// 						label="Qty"
// 						type="number"
// 						InputLabelProps={{
// 							shrink: true,
// 						}}
// 						onChange={(event) => setGivenQty(event.target.value)}
// 					/>
// 				)}
// 			</TableCell>
// 			<TableCell align="center">
// 				{selectedProductName &&
// 					Number(selectedProductObject.unitPrice).toFixed(2)}
// 			</TableCell>
// 			<TableCell align="center">
// 				{selectedProductName && givenQty && sum}
// 			</TableCell>
// 			<TableCell>
// 				<IconButton
// 					aria-label="done"
// 					size="medium"
// 					color="success"
// 					disabled={!selectedProductName || !selectedDosage || !givenQty}
// 				>
// 					<DoneIcon fontSize="inherit" color="success"></DoneIcon>
// 				</IconButton>
// 				<IconButton
// 					aria-label="close"
// 					size="medium"
// 					color="error"
// 					onClick={(event) => {
// 						let idx = event.currentTarget.parentNode.parentNode.getAttribute(
// 							"data-key"
// 						);
// 						console.log(Rows);
// 						removeRow(Rows, idx);
// 					}}
// 				>
// 					<CloseIcon fontSize="inherit" color="error"></CloseIcon>
// 				</IconButton>
// 			</TableCell>
// 		</>
// 	);
// };

// const removeRow = (rows, index) => {
// 	rows.slice(index, 1);
// };

export default PrescriptionPage;
