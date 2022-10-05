import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../components/auth/useToken";
import axios from "axios";

const LoginPage = () => {
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [error, setError] = useState(null);
	const [, setToken] = useToken();

	const navigate = useNavigate();

	const onLogin = async () => {
		const response = await axios
			.post("http://localhost:3000/api/login", {
				email: emailValue,
				password: passwordValue,
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setError(`Email or password incorrect...`);
				}
			});

		const { token } = response.data;
		setToken(token);
		navigate("/");
	};
	return (
		<div className="component-card-container">
			<div className="component-card-heading">
				<h3>Login</h3>
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
			</div>
			<div className="btn-group-container">
				<div className="btn-group-vertical">
					<button
						className="btn btn-primary"
						disabled={!emailValue || !passwordValue}
						onClick={() => onLogin()}
					>
						Log In
					</button>
				</div>
				<div className="btn-group-vertical">
					<button
						className="btn btn-secondary"
						onClick={() => navigate("./forgot-password")}
					>
						Forgot password
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => navigate("/signup")}
					>
						Don't have an account? <br /> Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
