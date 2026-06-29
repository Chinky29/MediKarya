/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // keep existing config
  experimental: {
    missingSuspenseWithCSRBailout: false,  // ← add this line
  },
}

module.exports = nextConfig