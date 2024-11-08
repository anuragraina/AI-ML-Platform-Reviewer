import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
	try {
		const endpoint = process.env.MONGO_URI;
		if (endpoint) {
			await mongoose.connect(endpoint);
			console.log('MongoDB connected');
		} else {
			throw new Error('MongoDB URI not found!');
		}
	} catch (error) {
		console.error('MongoDB connection failed', error);
	}
};

export default connectDB;
