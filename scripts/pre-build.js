import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { discoverRoutes } from './discover-routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function updateSnapConfig() {
  const pkgPath = resolve(__dirname, '..', 'package.json');
  const pkg     = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  const routes = await discoverRoutes();
  pkg.reactSnap.include = routes;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✅ pre-build: reactSnap.include updated with ${routes.length} routes`);
}

updateSnapConfig().catch(err => {
  // Non-fatal — fall back to static routes already in package.json
  console.warn(`⚠️  pre-build route discovery failed: ${err.message}`);
  console.warn('   Proceeding with static routes from package.json');
});
