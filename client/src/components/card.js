import React from "react";
import { useNavigate } from "react-router";

const Card = (props) => {
	const heading = props.heading;
	const iconClass = props.class;
	const route = props.route;
	const navigate = useNavigate();

	return (
		<div className="card" onClick={() => navigate(`${route}`)}>
			<div className="card-icon">
				<i className={iconClass} />
			</div>
			<div className="card-heading">
				<h3>{heading}</h3>
			</div>
		</div>
	);
};

export default Card;
