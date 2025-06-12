// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sitemap = new SitemapStream({ hostname: 'https://drprabhasdentistry.com' });
const writeStream = createWriteStream(__dirname + '/dist/sitemap.xml');
sitemap.pipe(writeStream);

  // Add routes manually (add more if you have other pages via client-side routing)
  sitemap.write({ url: '/dentist-in-nearme/chennai/vanagaram', changefreq: 'monthly', priority: 1.0 });
  sitemap.write({ url: '/dentist-in-vanagaram', changefreq: 'monthly', priority: 1.0 });
  sitemap.write({ url: '/services', changefreq: 'monthly', priority: 1.0 });
  sitemap.write({ url: '/doctor-tips', changefreq: 'monthly', priority: 1.0 });
  sitemap.write({ url: '/treatments', changefreq: 'monthly', priority: 1.0 });

  sitemap.end();


streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap generated at dist/sitemap.xml');
});
