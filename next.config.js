/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'picsum.photos',
            'via.placeholder.com',
            'placehold.co',
            'localhost'
        ],
        unoptimized: process.env.NODE_ENV === 'development'
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ]
            },
            {
                source: '/game/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'ALLOWALL'
                    }
                ]
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap'
            }
        ];
    }
};

module.exports = nextConfig;