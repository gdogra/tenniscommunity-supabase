/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Needed for Next.js 15 server components on Netlify
    appDir: true,
  },
  // 👇 Add this
  output: 'export',
};

module.exports = nextConfig;

