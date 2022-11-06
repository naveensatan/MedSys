import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToken } from "../components/auth/useToken";
import axios from "axios";

const UpdateUserPage = () => {
	const navigate = useNavigate();
	const [urlParams] = useSearchParams();
	const idToUpdate = urlParams.get("userId");
	const [token] = useToken();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [admin, setAdmin] = useState(false);
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState(null);

	useEffect(() => {
		axios
			.get(`/api/users/${idToUpdate}`, {
				headers: { Authorization: `bearer ${token}` },
			})
			.catch((err) => {
				return alert(err);
			})
			.then((res) => {
				setUsername(res.data.username);
				setEmail(res.data.email);
				setAdmin(res.data.admin);
			});
	}, [token, idToUpdate]);

	const onUpdate = async () => {
		setError(null);
		setFeedback(null);
		const response = await axios
			.put(
				`http://localhost:3000/api/update-users/${idToUpdate}`,
				{
					username: username,
					email: email,
					admin: admin,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.catch((err) => {
				if (err) return setError("Update Unsuccessfull");
			});

		if (response.status === 200)
			return setFeedback("User Updated Successfully...");
	};

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Edit User</h3>
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
							<label className="form-label" htmlFor="username">
								Username
							</label>
							<input
								className="form-control"
								type="text"
								id="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="email">
								Email
							</label>
							<input
								className="form-control"
								type="text"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="admin">
								Admin
							</label>
							<select
								className="form-select"
								id="admin"
								name="admin"
								value={admin}
								onChange={(e) => setAdmin(e.target.value)}
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</div>
					</div>
					<div className="btn-group-crud-card">
						<div className="btn-group-crud-card-vertical">
							<button
								className="btn btn-primary"
								disabled={username === "" || email === ""}
								onClick={() => onUpdate()}
							>
								Update
							</button>
							<button
								className="btn btn-danger"
								onClick={() => navigate("/users")}
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

export default UpdateUserPage;
