/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/position',
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
