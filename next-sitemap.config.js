/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://echosunnah.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/apple-icon.png',
    '/icon0.svg',
    '/icon1.png',
    '/manifest.json',
    '/dashboard',
    '/profile',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/profile',
        ],
      },
    ],
  },
};

