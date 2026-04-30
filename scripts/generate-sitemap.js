import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { discoverRoutes } from './discover-routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL  = process.env.SITE_URL || 'https://thesamarthacademy.in';
const TODAY     = new Date().toISOString().split('T')[0];

const PRIORITIES = {
  '/':        { priority: 1.0, changefreq: 'weekly'  },
  '/courses': { priority: 0.9, changefreq: 'weekly'  },
  '/about':   { priority: 0.8, changefreq: 'monthly' },
  '/faculty': { priority: 0.7, changefreq: 'monthly' },
  '/contact': { priority: 0.6, changefreq: 'monthly' },
};

function meta(route) {
  if (PRIORITIES[route])          return PRIORITIES[route];
  if (route.startsWith('/faculty/')) return { priority: 0.6, changefreq: 'monthly' };
  return { priority: 0.9, changefreq: 'weekly' }; // landing pages
}

async function generate() {
  console.log('🗺️  Generating sitemap...');
  const routes = await discoverRoutes();

  const urls = routes.map(r => {
    const { priority, changefreq } = meta(r);
    return `  <url>\n    <loc>${SITE_URL}${r === '/' ? '' : r}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  const out = resolve(__dirname, '..', 'dist', 'sitemap.xml');
  writeFileSync(out, xml);
  console.log(`✅ Sitemap: ${routes.length} URLs → ${out}`);
}

generate().catch(err => { console.error('Sitemap failed:', err); process.exit(1); });
