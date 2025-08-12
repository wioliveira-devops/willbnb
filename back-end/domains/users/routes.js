import { Router } from 'express';
import { connectDb } from '../../config/db.js'; // Import the database connection function
import User from './model.js'; // Import the User model for database operations
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

const router = Router();
const bcryptSalt = bcrypt.genSaltSync(); // Generate a salt for hashing passwords


router.get("/", async (req, res) => {
	connectDb(); // Ensure the database connection is established

	try {
		const userDoc = await User.find(); // Fetch all users from the database

		res.json(userDoc); // Respond with the user data in JSON format
	} catch (error) {
		res.status(500).json(error); // Respond with an error if the fetch fails
	}
});

router.post("/", async (req, res) => {
	connectDb(); // Ensure the database connection is established

	const { name, email, password } = req.body; // Destructure the request body to get user details
	const encryptedPassword = bcrypt.hashSync(password, bcryptSalt); // Hash the password using bcrypt

	try {
		const newUserDoc = await User.create({
			name, // Create a new user document with the provided details
			email, // Email is required for user identification
			password: encryptedPassword, // Password is required for user authentication
		}); // Create a new user instance with the request body

		res.json(newUserDoc); // Respond with the newly created user data in JSON format
	} catch (error) {
		res.status(500).json(error); // Respond with an error if the creation fails
	}
});

export default router; // Export the router to be used in the main server file
