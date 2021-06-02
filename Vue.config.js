const path = require('path')

module.exports = {
  // webpack-dev-server
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    before: app => {
    },
    proxy: {
      '/api': {
        target: 'http://192.168.3.168:82/',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      },
    }
  },
}
