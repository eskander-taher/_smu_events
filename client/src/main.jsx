import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import AuthProvider from "./context/Auth/AuthProvider";
import AxiosProvider from "./context/AxiosProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<AuthProvider>
			<AxiosProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AxiosProvider>
		</AuthProvider>
	</Router>
);
