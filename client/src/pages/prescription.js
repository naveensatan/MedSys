import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
	const navigate = useNavigate();
	const [token] = useToken();
	const [Products, setProducts] = useState(null);
	const [selectedProductName, setSelectedProductName] = useState(null);
	const [selectedProductObject, setSelectedProductObject] = useState({});
	const [givenQty, setGivenQty] = useState(0);
	const [rows, setRow] = useState([]);

	//handle table row cancel
	const handleCancel = (rowId) => {
		//filter the rows by given row ID
		let updatedRows = rows.filter((row) => {
			return row.id !== rowId;
		});

		setRow(updatedRows); //set filtered rows
	};

	//handle row edit togglw
	const handleEditToggle = (rowId) => {
		let currentRows = [...rows]; //make a copy of state array
		let rowEditIdx = currentRows.findIndex((v) => v.id === rowId); //find the index of the row to edit by row ID
		let rowEditObj = { ...currentRows[rowEditIdx] }; //get the row using found index
		rowEditObj.isEditing = true; //set the row to editing state
		currentRows[rowEditIdx] = rowEditObj; //replace the updated row
		setRow(currentRows); //set rows with updated row
	};

	//handle row edit confirm
	const handleEditConfirm = (rowId) => {
		let currentRows = [...rows]; //make a copy of state array
		let rowEditIdx = currentRows.findIndex((v) => v.id === rowId); //find the index of the row to edit by row ID
		let rowEditObj = {
			...currentRows[rowEditIdx],
		}; //get the row using found index
		rowEditObj.isEditing = false; //set the row to non-editing state
		currentRows[rowEditIdx] = rowEditObj; //replace the updated row
		setRow(currentRows); //set rows with updated row
	};

	const handleEdit = (rowId, newQty) => {
		let currentRows = [...rows]; //make a copy of state array
		let rowEditIdx = currentRows.findIndex((v) => v.id === rowId); //find the index of the row to edit by row ID
		let rowEditObj = {
			...currentRows[rowEditIdx],
		}; //get the row using found index
		rowEditObj.qty = newQty; //assign new qty
		rowEditObj.sum = calcSum(rowEditObj.unitPrice, newQty); //calculate new sum
		currentRows[rowEditIdx] = rowEditObj; //replace the updated row
		setRow(currentRows); //set rows with updated row
	};

	//fetch products
	useEffect(() => {
		axios
			.get("/api/products", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						return navigate("/login");
					}
					if (err.response.status === 404) {
						return alert("No products found...");
					}
				}
			})
			.then((res) => res && setProducts(res.data));
	}, [token]);

	//set SelectedProductObject everytime the selected product name changes
	useEffect(() => {
		if (selectedProductName == null) return;
		const obj = Products.find(
			(product) => product.productName === selectedProductName
		);
		setSelectedProductObject(obj);
	}, [selectedProductName]);

	//////Popover////////
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	/////////////////////

	const onConfirmOrder = () => {
		const order = {
			items: [
				{ productName: "name", qty: 0 },
				{ productName: "name2", qty: 0 },
			],
			total: 0,
		};
	};

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
										<TextField
											label={"Qty"}
											type={"number"}
											required
											variant="standard"
											disabled={!selectedProductName}
											onChange={(e) => setGivenQty(e.target.value)}
										></TextField>

										<IconButton
											variant="contained"
											color="success"
											size="large"
											disabled={!selectedProductName || givenQty < 1}
											sx={{ width: "30%", alignSelf: "center" }}
											onClick={() => {
												setRow((currentRows) => [
													...currentRows,
													{
														id: randomId(),
														productName: selectedProductObject.productName,
														brandName: selectedProductObject.brandName,
														strength: selectedProductObject.strength,
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
							<>
								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 700 }} aria-label="spanning table">
										<TableHead>
											<TableRow>
												<TableCell align="center">Desc</TableCell>
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
															{`${row.productName} -- `}
															<span style={{ fontWeight: "bold" }}>
																{row.brandName}
															</span>
														</TableCell>
														{row.isEditing ? (
															<TableCell align="center">
																<TextField
																	defaultValue={row.qty}
																	type={"number"}
																	onChange={(e) =>
																		handleEdit(row.id, e.target.value)
																	}
																></TextField>
															</TableCell>
														) : (
															<TableCell align="center">{row.qty}</TableCell>
														)}

														<TableCell align="center">
															{row.unitPrice.toFixed(2)}
														</TableCell>
														<TableCell align="center">{row.sum}</TableCell>
														<TableCell align="center">
															{row.isEditing ? (
																<IconButton
																	onClick={() => handleEditConfirm(row.id)}
																>
																	<DoneIcon></DoneIcon>
																</IconButton>
															) : (
																<IconButton
																	onClick={() => handleEditToggle(row.id)}
																>
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
														<TableCell colSpan={2}></TableCell>
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
								<div className="btn-group-horizontal">
									<Button variant="contained" color="success">
										Confirm
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => setRow([])}
									>
										Clear
									</Button>
								</div>
							</>
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
