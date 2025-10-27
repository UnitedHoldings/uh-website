/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    // Or if using Next.js 12.3.0 or higher, we can use remotePatterns for more control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.sanity.io',
    //     pathname: '/images/**',
    //   },
    // ],
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
