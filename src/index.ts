import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db';
import { addPlatforms } from './utils/addPlatforms';

dotenv.config();
const app = express();

connectDB();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello!');
});

app.get('/platforms', (req: Request, res: Response) => {
	addPlatforms();
	res.send('Platforms are being added. This may take some time!');
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
