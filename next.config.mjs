/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  source: "/:path*",
  headers: [
    {
      key: "Content-Security-Policy",
      value:
        "default-src 'self'; script-src 'self' https://*.posthog.com; connect-src 'self' https://*.posthog.com; worker-src 'self' blob: data:;",
    },
  ],
};

export default nextConfig;
