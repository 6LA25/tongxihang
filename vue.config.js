const path = require('path')
var CssSplitWebpackPlugin = require('css-split-webpack-plugin').default
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  lintOnSave: false,
  devServer: {
    port: 8099,
    proxy: {
      '/api': {
        target: 'http://anxuanhouse.com',
        // target: 'http://47.103.39.72:8888',
        // target: 'http://106.15.190.210:8888',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CssSplitWebpackPlugin({
        size: 4000
      })
    ],
    module: {
      rules: [
        {
          test: /\.swf$/, // 处理字体
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    resolve: {
      alias: {
        '@public': path.resolve(__dirname, './public'),
        '@services': path.resolve(__dirname, './src/assets/services'),
        '@src': path.resolve(__dirname, './src'),
        '@component': path.resolve(__dirname, '../src/components')
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
