import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db';

dotenv.config();
const app = express();

connectDB();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello!');
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
