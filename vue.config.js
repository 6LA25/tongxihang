const path = require('path')
var CssSplitWebpackPlugin = require('css-split-webpack-plugin').default
module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8099,
    proxy: {
      '/api': {
        target: 'http://anxuanhouse.com',
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
