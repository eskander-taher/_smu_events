import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes/AppRoutes";

function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return <AppRoutes />;
}

export default App;
