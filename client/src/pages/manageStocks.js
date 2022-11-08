import React from "react";
import Card from "../components/card.js";

const ManageStocks = () => {
	return (
		<div className="page">
			<div className="page-heading">
				<h3>Manage Stocks</h3>
			</div>
			<hr />
			<div className="page-content-cards">
				<Card
					heading="Add Product"
					class="fa-solid fa-plus add"
					route="/manage-stocks/add"
				/>
				<Card heading="Update Product" class="fa-solid fa-wrench update" />
				<Card heading="Remove Product" class="fa-solid fa-trash remove" />
			</div>
		</div>
	);
};

export default ManageStocks;
