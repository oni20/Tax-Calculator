const withSass = require('@zeit/next-sass')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? 'https://cdn.statically.io/gh/oni20/oni20.github.io/031120/' : '',
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}