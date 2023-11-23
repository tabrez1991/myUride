/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    experimental: {
        esmExternals: 'loose'
    }
}

module.exports = nextConfig
