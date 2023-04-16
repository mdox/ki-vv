import react from "@vitejs/plugin-react-swc";
import { PreviewOptions, ServerOptions, defineConfig } from "vite";

const serveOptions: ServerOptions | PreviewOptions = {
	host: "0.0.0.0",
	port: 3000,
};

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		...serveOptions,
	},
	preview: {
		...serveOptions,
	},
	plugins: [react()],
});
