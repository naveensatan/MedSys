import React from "react";

const Card = (props) => {
	const title = props.title;
	const icon = props.icon;

	return (
		<div className="dashboard-card">
			<div className="card-icon">
				<img src={icon} alt={`card icon for ${title}`} />
			</div>
			<div className="card-title">
				<h3>{title}</h3>
			</div>
		</div>
	);
};

export default Card;
