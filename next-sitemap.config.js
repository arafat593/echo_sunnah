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
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
