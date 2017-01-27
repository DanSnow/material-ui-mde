const path = require('path')
const webpack = require('webpack')
const {
  addPlugins,
  createConfig,
  customConfig,
  defineConstants,
  env,
  entryPoint,
  setOutput,
  sourceMaps
} = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('bundle.js'),
  customConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '..', 'node_modules')
      ],
      alias: {
        'material-ui-mde': path.resolve(__dirname, '..', 'lib')
      }
    }
  }),
  babel(),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  env('development', [
    devServer(),
    sourceMaps()
  ]),
  env('production', [
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ])
  ])
])
