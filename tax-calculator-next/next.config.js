const withSass = require('@zeit/next-sass')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}