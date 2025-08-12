import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import UserRoutes from './domains/users/routes.js'; // Import user routes

const app = express();
const { PORT } = process.env; // Get the port from environment variables

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/users", UserRoutes); // Use user routes for handling user-related requests

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// const cors = require('cors');
// app.use(cors()); // Enable CORS for all routes

