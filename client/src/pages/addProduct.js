import React from "react";
import { useState } from "react";
import { useToken } from "../components/auth/useToken";
import { useNavigate } from "react-router";
import axios from "axios";

const AddProduct = () => {
	const [product, setProduct] = useState("");
	const [brand, setBrand] = useState("");
	const [qty, setQty] = useState("");
	const [dosage, setDosage] = useState("");
	const [metric, setMetric] = useState("mg");
	const [manuDate, setManuDate] = useState("");
	const [expDate, setExpDate] = useState("");
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState(null);

	const navigate = useNavigate();
	const [token] = useToken();

	const onAddProduct = async () => {
		setError(null);
		setFeedback(null);
		const response = await axios
			.post(
				"http://localhost:3000/api/add-product",
				{
					productName: product,
					brandName: brand,
					qty: qty,
					dosage: `${dosage}${metric}`,
					manufacture: manuDate,
					expiry: expDate,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.catch((err) => {
				if (err.response.status === 409)
					return setError("Product already exists... Try updating");

				if (err.response.status === 403 || 401)
					return setError("You are not authorized to perform this action");
			});

		if (response.status === 200)
			return setFeedback("Product added successfully...");
	};

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Add Product</h3>
			</div>
			<hr />
			<div className="page-content-forms">
				{error ? (
					<div className="errors">
						<p>{error}</p>
					</div>
				) : null}
				{feedback ? (
					<div className="form-feedback">
						<p>{feedback}</p>
					</div>
				) : null}
				<div className="crud-card">
					<div className="crud-card-content">
						<div className="form-group">
							<label className="form-label" htmlFor="productName">
								Product Name
							</label>
							<input
								className="form-control"
								type="text"
								id="productName"
								name="productName"
								value={product}
								onChange={(e) => setProduct(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="brandName">
								Brand Name
							</label>
							<input
								className="form-control"
								type="text"
								id="brandName"
								name="brandName"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="qty">
								Quantity
							</label>
							<input
								className="form-control"
								type="number"
								id="qty"
								name="qty"
								value={qty}
								onChange={(e) => setQty(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="dosage">
								Dosage
							</label>
							<div className="input-group">
								<input
									className="form-control"
									type="number"
									id="dosage"
									name="dosage"
									value={dosage}
									onChange={(e) => setDosage(e.target.value)}
								></input>
								<select
									name="metric"
									onChange={(e) => setMetric(e.target.value)}
								>
									<option value="mg" default>
										mg
									</option>
									<option value="mg">ml</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="manuDate">
								Manufactured Date
							</label>
							<input
								className="form-control"
								type="date"
								id="manuDate"
								name="manuDate"
								value={manuDate}
								onChange={(e) => setManuDate(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="expDate">
								Expiry Date
							</label>
							<input
								className="form-control"
								type="date"
								id="expDate"
								name="expDate"
								value={expDate}
								onChange={(e) => setExpDate(e.target.value)}
							></input>
						</div>
					</div>
					<div className="btn-group-crud-card">
						<div className="btn-group-crud-card-vertical">
							<button
								className="btn btn-primary"
								disabled={!product || !qty || !expDate || !dosage || !manuDate}
								onClick={() => onAddProduct()}
							>
								Add
							</button>
							<button
								className="btn btn-danger"
								onClick={() => navigate("/manage-stocks")}
							>
								Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
