// ESM — runs in Node 18+ (built-in fetch available)
const API_BASE = process.env.VITE_API_BASE_URL || 'https://thesamarthacademy.in/api';

export async function discoverRoutes() {
  const routes = ['/', '/about', '/faculty', '/contact', '/courses', '/blog'];

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

    // Blog: categories
    const catRes  = await fetch(`${API_BASE}/blog/categories`, { signal: AbortSignal.timeout(10000) });
    const catData = await catRes.json();
    if (catData.success && Array.isArray(catData.data)) {
      catData.data.forEach(c => { if (c.slug) routes.push(`/blog/category/${c.slug}`); });
    }

    // Blog: posts (paginate to get all slugs)
    let blogPage = 1;
    let hasMore  = true;
    while (hasMore && blogPage <= 20) {
      const postsRes  = await fetch(`${API_BASE}/blog/posts?page=${blogPage}&limit=50`, { signal: AbortSignal.timeout(10000) });
      const postsData = await postsRes.json();
      if (postsData.success && Array.isArray(postsData.data) && postsData.data.length > 0) {
        postsData.data.forEach(p => { if (p.slug) routes.push(`/blog/${p.slug}`); });
        hasMore = blogPage < (postsData.totalPages || 1);
        blogPage++;
      } else {
        hasMore = false;
      }
    }

    console.log(`🔍 Discovered ${routes.length} routes`);
    return routes;
  } catch (err) {
    console.warn(`⚠️  Route discovery failed (${err.message}) — falling back to static routes`);
    return routes;
  }
}
