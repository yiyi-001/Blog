const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/',

  lintOnSave: 'error',
  productionSourceMap: !IS_PROD, // 生产环境的 source map

  chainWebpack: config => {
    // 利用splitChunks单独打包第三方模块
    config.optimization
      .splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src'), // 可自定义拓展你的规则
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })

    config.optimization
      .runtimeChunk({
        name: 'manifest'
      })

    config.resolve.alias
      .set('src', resolve('src'))
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}
