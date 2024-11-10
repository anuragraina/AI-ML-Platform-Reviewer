import FirecrawlApp from '@mendable/firecrawl-js';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const crawl = async () => {
	const app = new FirecrawlApp({
		apiKey: process.env.FIRECRAWL_API_KEY,
	});

	// Define schema to extract contents into
	const schema = z.array(
		z.object({
			platform_name: z.string(),
			desrciption: z.string(),
			features: z.array(z.string()),
			key_differentiators: z.array(z.string()),
			clients: z.array(z.string()),
			industries: z.array(z.string()),
			pricing_if_available: z.string(),
		})
	);

	const scrapeResult = await app.scrapeUrl(
		'https://www.g2.com/categories/data-science-and-machine-learning-platforms?page=1',
		{
			formats: ['extract'],
			extract: { schema: schema },
			timeout: 1000 * 60 * 2,
		}
	);

	if (!scrapeResult.success) {
		throw new Error(`Failed to scrape: ${scrapeResult.error}`);
	}

	return scrapeResult.extract;
};
