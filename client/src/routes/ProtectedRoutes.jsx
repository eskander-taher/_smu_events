import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AdminRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "admin" ? children : <Navigate to="/auth/signin" />;
};

export const ModRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "mod" ? children : <Navigate to="/auth/signin" />;
};

export const AuthorRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "author" ? children : <Navigate to="/auth/signin" />;
};
