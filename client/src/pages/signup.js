import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../components/auth/useToken";

const SignUpPage = () => {
	const [, setToken] = useToken();
	const [firstnameValue, setFirstnameValue] = useState("");
	const [lastnameValue, setLastnameValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const onSignUp = async () => {
		const response = await axios
			.post("http://localhost:3000/api/signup", {
				firstName: firstnameValue,
				lastName: lastnameValue,
				email: emailValue,
				password: passwordValue,
			})
			.catch((err) => {
				if (err.response.status === 409) {
					setError(`User already exists with email: ${emailValue}...`);
				}
			});
		const { token } = response.data;
		setToken(token);
		navigate(`/`);
	};

	return (
		<div className="component-card-container">
			<div className="component-card-heading">
				<h3>Sign Up</h3>
			</div>
			<div className="component-card-content">
				{error ? (
					<div className="errors">
						<p>{error}</p>
					</div>
				) : null}
				<div className="form-group">
					<label className="form-label" htmlFor="email">
						Email
					</label>
					<input
						className="form-control"
						type="text"
						id="email"
						name="email"
						value={emailValue}
						onChange={(e) => setEmailValue(e.target.value)}
					></input>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="firstname">
						First Name
					</label>
					<input
						className="form-control"
						type="text"
						id="firstname"
						name="firstname"
						value={firstnameValue}
						onChange={(e) => setFirstnameValue(e.target.value)}
					></input>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="lastname">
						Last Name
					</label>
					<input
						className="form-control"
						type="text"
						id="lastname"
						name="lastname"
						value={lastnameValue}
						onChange={(e) => setLastnameValue(e.target.value)}
					></input>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="pswd">
						Password
					</label>
					<input
						className="form-control"
						type="password"
						id="pswd"
						name="pswd"
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
					></input>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="cpswd">
						Confirm Password
					</label>
					<input
						className="form-control"
						type="password"
						id="cpswd"
						name="cpswd"
						value={confirmPasswordValue}
						onChange={(e) => setConfirmPasswordValue(e.target.value)}
					></input>
				</div>
			</div>
			<div className="btn-group-container">
				<div className="btn-group-vertical">
					<button
						className="btn btn-primary"
						disabled={
							!emailValue ||
							!passwordValue ||
							passwordValue !== confirmPasswordValue ||
							!firstnameValue ||
							!lastnameValue
						}
						onClick={() => onSignUp()}
					>
						Sign Up
					</button>
				</div>
				<div className="btn-group-vertical">
					<button
						className="btn btn-secondary"
						onClick={() => navigate("/login")}
					>
						Already have an account? <br /> Log In
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
