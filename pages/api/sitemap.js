const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const SITE_URL = 'https://gamevault-alpha.vercel.app';

function generateSiteMap(games) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- We manually set the two URLs we know already -->
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about-us</loc>
     </url>
     <url>
       <loc>${SITE_URL}/contact-us</loc>
     </url>
     <url>
       <loc>${SITE_URL}/privacy-policy</loc>
     </url>
     <url>
       <loc>${SITE_URL}/terms</loc>
     </url>
     ${games
      .map(({ slug }) => {
        return `
       <url>
           <loc>${`${SITE_URL}/game/${slug}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

export default async function handler(req, res) {
  try {
    // We fetch the dynamic data
    const request = await fetch(`${EXTERNAL_DATA_URL}/games`);
    const response = await request.json();
    const games = response.data || [];

    // We generate the XML sitemap with the games data
    const sitemap = generateSiteMap(games);

    res.setHeader('Content-Type', 'text/xml');
    // we send the sitemap to the browser
    res.write(sitemap);
    res.end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}