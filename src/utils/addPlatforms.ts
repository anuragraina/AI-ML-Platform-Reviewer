import fs from 'fs';
import path from 'path';

import { crawl } from './crawler';
import Platform from '../models/Platform';

export const addPlatforms = async () => {
	try {
		console.log('Adding platforms...');
		const data = await crawl();

		if (data && data.length > 0) {
			data.forEach(async (platform) => {
				const {
					platform_name,
					description,
					features,
					key_differentiators,
					clients,
					industries,
					pricing_if_available,
				} = platform;

				const markdownContent = `# ${platform_name}
					\n\n## Description\n- ${description}
					\n\n## Features\n- ${features.join('\n- ')}
					\n\n## Differentiators\n- ${key_differentiators.join('\n- ')}
					\n\n## Clients\n- ${clients.join('\n- ')}
					\n\n## Industries\n- ${industries.join('\n- ')}
					\n\n## Pricing\n${pricing_if_available}`;

				const markdownPath = path.join(__dirname, '../../data', `${platform.platform_name}.md`);

				// Check if the directory exists, create it if not
				const dir = path.dirname(markdownPath);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}
				fs.writeFileSync(markdownPath, markdownContent);

				const platformToSave = new Platform({
					name: platform_name,
					description,
					features,
					differentiators: key_differentiators,
					clients,
					industries,
					pricing: pricing_if_available,
					markdownPath,
				});

				await platformToSave.save();
			});

			console.log('Data added successfully!');
		}
	} catch (err) {
		console.error(err);
	}
};
