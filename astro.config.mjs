// @ts-check
import { defineConfig } from 'astro/config';

// Override with PUBLIC_SITE_URL only for a different host. No trailing slash.
const site = process.env.PUBLIC_SITE_URL || 'https://topbunktravel.westonwatson.com';

export default defineConfig({
	site,
	output: 'static',
});
