// ESM — runs in Node 18+ (built-in fetch available)
const API_BASE = process.env.VITE_API_BASE_URL || 'https://thesamarthacademy.in/api';

export async function discoverRoutes() {
  const routes = ['/', '/about', '/faculty', '/contact', '/courses'];

  try {
    // Landing pages
    const lpRes  = await fetch(`${API_BASE}/landing-pages?fields=slug`, { signal: AbortSignal.timeout(10000) });
    const lpData = await lpRes.json();
    if (lpData.success && Array.isArray(lpData.data)) {
      lpData.data.forEach(p => { if (p.slug) routes.push(`/${p.slug}`); });
    }

    // Faculty detail pages
    const fRes  = await fetch(`${API_BASE}/faculty`, { signal: AbortSignal.timeout(10000) });
    const fData = await fRes.json();
    if (fData.success && Array.isArray(fData.data)) {
      fData.data.forEach(f => {
        const id = f.slug || f._id;
        if (id) routes.push(`/faculty/${id}`);
      });
    }

    console.log(`🔍 Discovered ${routes.length} routes`);
    return routes;
  } catch (err) {
    console.warn(`⚠️  Route discovery failed (${err.message}) — falling back to static routes`);
    return routes;
  }
}
