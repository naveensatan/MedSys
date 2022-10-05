import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import { Buffer } from "buffer";

export const useUser = () => {
	const [token] = useToken(); //get JWT from local storage

	const getTokenPayload = (token) => {
		//get the actuale payload of JWT
		const encodedPayload = token.split(".")[1];
		return JSON.parse(Buffer.from(encodedPayload, "base64"));
	};

	const [user, setUser] = useState(() => {
		if (!token) return null;
		return getTokenPayload(token); //set initial user details
	});

	useEffect(() => {
		if (!token) {
			setUser(null);
		} else {
			setUser(getTokenPayload(token));
		}
	}, [token]);

	return user;
};
