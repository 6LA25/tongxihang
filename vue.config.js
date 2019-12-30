const path = require('path')
var CssSplitWebpackPlugin = require('css-split-webpack-plugin').default
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  devServer: {
    port: 8099
  },
  configureWebpack: {
    plugins: [
      new CssSplitWebpackPlugin({
        size: 4000
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: false // console
            }
          }
        })
      ]
    },
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
        '@component': path.resolve(__dirname, '../src/components')
      }
    }
  }
}
