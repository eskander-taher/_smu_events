import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// define: {
	// 	__API_BASE_URL__:
	// 		mode === "production"
	// 			? JSON.stringify("https://your-production-server.com")
	// 			: JSON.stringify("http://localhost:80/api"),
	// },
});
