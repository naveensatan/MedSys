import "./App.css";
import LoginPage from "./pages/login.js";
import SignUp from "./pages/signup.js";
import Dashboard from "./pages/dashboard.js";
import { PrivateRoutes } from "./components/auth/PrivateRoutes.js";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path="/" exact element={<Dashboard />}></Route>
					</Route>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
