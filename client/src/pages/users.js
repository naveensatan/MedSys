import React, { useEffect, useState } from "react";
import { useToken } from "../components/auth/useToken";
import { useNavigate } from "react-router";
import axios from "axios";

const UsersPage = () => {
	const [token] = useToken();
	const [users, setUsers] = useState(null);
	const [feedbackMsg, setFeedbackMsg] = useState(null);

	const navigate = useNavigate();

	const deleteUser = async (userId) => {
		const response = await axios
			.delete(`/api/users/delete-user/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.catch((err) => {
				return alert("Not authorized!", err);
			});

		if (response.status === 200) return setFeedbackMsg("User removed");
	};

	useEffect(() => {
		axios
			.get("/api/users", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.catch((err) => {
				return alert(err);
			})
			.then((res) =>
				res ? setUsers(res.data) : Error("No response from server")
			);
	}, [token]);

	return (
		<div className="page">
			<div className="page-heading">
				<h3>Users</h3>
			</div>
			<hr />
			{feedbackMsg ? (
				<div className="form-feedback">
					<p>{feedbackMsg}</p>
				</div>
			) : null}
			<div className="page-content">
				{users ? (
					<table className="table table-striped users-table">
						<thead>
							<tr>
								<th scope="col">Username</th>
								<th scope="col">Email</th>
								<th scope="col">Manage Users</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => {
								return (
									<tr key={user._id}>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td className="users-table-actions">
											<button
												onClick={() =>
													navigate({
														pathname: `/users/update-user/`,
														search: `userId=${user._id}`,
													})
												}
												className="btn btn-primary"
											>
												Edit
											</button>
											<button
												onClick={() => {
													deleteUser(user._id);
												}}
												className="btn btn-danger"
											>
												Remove
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : null}
			</div>
		</div>
	);
};

export default UsersPage;
