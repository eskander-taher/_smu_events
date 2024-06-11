import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AdminRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "админ" ? children : <Navigate to="/auth/login" />;
};

export const ModRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "модератор" ? children : <Navigate to="/auth/login" />;
};

export const AuthorRoute = ({ children }) => {
	const { user } = useAuth();
	return user && user.role === "автор" ? children : <Navigate to="/auth/login" />;
};
