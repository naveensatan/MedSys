import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";

export const PrivateRoutes = () => {
	const user = useUser();

	if (user) {
		return <Outlet />;
	}

	return <Navigate to={"/login"} />;
};
