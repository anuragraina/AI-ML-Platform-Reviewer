import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db';
import { crawl } from './utils/crawler';

dotenv.config();
const app = express();

connectDB();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello!');
});

app.get('/crawl', async (req: Request, res: Response) => {
	const data = await crawl();
	res.json(data);
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
