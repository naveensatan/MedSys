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
	Popover,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
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

	const handleEdit = (rowId) => {
		let currentRows = [...rows];
		let rowEditIdx = currentRows.findIndex((v) => v.id === rowId);
		let rowEditObj = { ...currentRows[rowEditIdx] };
		rowEditObj.isEditing = true;
		currentRows[rowEditIdx] = rowEditObj;
		setRow(currentRows);
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

	//////////////
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	///////////////

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Prescription</h3>
			</div>
			<hr />
			<div className="page-content" style={{ gap: "1em" }}>
				{Products ? (
					<>
						<div className="prescription-addButton">
							<Button
								aria-describedby={id}
								variant="contained"
								onClick={handleClick}
							>
								Add Product
							</Button>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
							>
								{
									<Stack
										sx={{
											padding: "2rem",
											borderRadius: "1rem",
											rowGap: "1rem",
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

										<IconButton
											variant="contained"
											color="success"
											size="large"
											disabled={
												!selectedProductName || !selectedDosage || givenQty < 1
											}
											sx={{ width: "30%", alignSelf: "center" }}
											onClick={() => {
												setRow((currentRows) => [
													...currentRows,
													{
														id: randomId(),
														productName: selectedProductObject.productName,
														dosage: selectedDosage,
														qty: givenQty,
														unitPrice: selectedProductObject.unitPrice,
														sum: calcSum(
															selectedProductObject.unitPrice,
															givenQty
														),
														isEditing: false,
													},
												]);
												handleClose();
											}}
										>
											<DoneIcon fontSize="large"></DoneIcon>
										</IconButton>
									</Stack>
								}
							</Popover>
						</div>
						{rows.length !== 0 && (
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
										{rows.map((row, i) => {
											return (
												<TableRow idx={row.id} key={i}>
													<TableCell align="center">
														{row.productName}
													</TableCell>
													<TableCell align="center">{row.dosage}</TableCell>
													{row.isEditing ? (
														<TableCell align="center">
															<TextField type={"number"}></TextField>
														</TableCell>
													) : (
														<TableCell align="center">{row.qty}</TableCell>
													)}

													<TableCell align="center">{row.unitPrice}</TableCell>
													<TableCell align="center">{row.sum}</TableCell>
													<TableCell align="center">
														{row.isEditing ? (
															<IconButton>
																<DoneIcon></DoneIcon>
															</IconButton>
														) : (
															<IconButton onClick={() => handleEdit(row.id)}>
																<EditIcon></EditIcon>
															</IconButton>
														)}
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
						)}
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

export default PrescriptionPage;
