import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./common/Loader";
import AppRoutes from "./routes/AppRoutes";
import DarkModeSwitcher from "./components/Header/DarkModeSwitcher";

function App() {
	const [loading, setLoading] = useState(true);
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return loading ? <Loader /> : <AppRoutes />;
}

export default App;
