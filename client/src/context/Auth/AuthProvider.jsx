import { createContext } from "react";
import { useReducer } from "react";
import { authActions, authInitialState, authReducer } from "./AuthUtils";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, authInitialState);
	const navigate = useNavigate();

	let loginUser = (data) => {
		dispatch({
			type: authActions.SUCCESS_LOGIN,
			payload: { authState: data },
		});
		navigate("/");
	};

	let logoutUser = () => {
		dispatch({ type: authActions.LOGOUT });
		navigate("/auth/signin");
	};

	let contextData = {
		authState: authState.authState,
		loginUser: loginUser,
		authDispatch: dispatch,
		logoutUser,
		authError: authState.error,
		user: authState.user,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
