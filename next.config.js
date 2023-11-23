/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    images: { unoptimized: true }, 
    experimental: {
        esmExternals: 'loose'
    }
}

module.exports = nextConfig
