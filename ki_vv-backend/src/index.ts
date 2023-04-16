import server from "./server";

// Env
const PORT = 8080;

// Start server
server.listen(PORT, () => {
	console.log("Server listening on port %s", PORT);
});
