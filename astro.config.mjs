// @ts-check
import { defineConfig } from 'astro/config';

// Set PUBLIC_SITE_URL in the environment before you launch.
// example.com is only a stand-in so canonical and social URLs stay valid locally.
const site = process.env.PUBLIC_SITE_URL || 'https://example.com';

export default defineConfig({
	site,
	output: 'static',
});
