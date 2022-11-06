import "./App.css";
import LoginPage from "./pages/login.js";
import SignUp from "./pages/signup.js";
import Dashboard from "./pages/dashboard.js";
import Topbar from "./components/topBar";
import SideBar from "./components/sideBar";
import ManageStocks from "./pages/manageStocks";
import AddProduct from "./pages/addProduct";
import UsersPage from "./pages/users";
import UpdateUserPage from "./pages/updateUser";
import { PrivateRoutes } from "./components/auth/PrivateRoutes.js";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route
							path="/"
							exact
							element={
								<>
									<Topbar />
									<SideBar />
									<Dashboard />
								</>
							}
						></Route>
						<Route
							path="/manage-stocks"
							exact
							element={
								<>
									<Topbar />
									<SideBar />
									<ManageStocks />
								</>
							}
						></Route>
						<Route
							path="/manage-stocks/add"
							exact
							element={
								<>
									<Topbar />
									<SideBar />
									<AddProduct />
								</>
							}
						></Route>
						<Route
							path="/users"
							exact
							element={
								<>
									<Topbar />
									<SideBar />
									<UsersPage />
								</>
							}
						></Route>
						<Route
							path="/users/update-user"
							exact
							element={
								<>
									<Topbar />
									<SideBar />
									<UpdateUserPage />
								</>
							}
						></Route>
					</Route>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
