import { gamesApi, categoriesApi } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/constants';

function generateSiteMap(games, categories) {
    const baseUrl = SITE_CONFIG.url;

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Categories -->
  ${categories
        .map(
            (category) => `
  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join('')}

  <!-- Games -->
  ${games
        .map(
            (game) => `
  <url>
    <loc>${baseUrl}/game/${game.slug}</loc>
    <lastmod>${game.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
        )
        .join('')}
</urlset>`;
}

export default async function handler(req, res) {
    try {
        const [gamesRes, categoriesRes] = await Promise.all([
            gamesApi.getSitemap(),
            categoriesApi.getAll()
        ]);

        const games = gamesRes.data || [];
        const categories = categoriesRes.data || [];

        const sitemap = generateSiteMap(games, categories);

        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

        return res.status(200).send(sitemap);
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return res.status(500).json({ error: 'Failed to generate sitemap' });
    }
}