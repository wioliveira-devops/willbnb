import 'dotenv/config'; // Load environment variables from .env file
import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectDb = async () => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

connectDb();

export default mongoose;