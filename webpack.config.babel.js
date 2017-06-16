const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'

const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'config',
    minChunks: Infinity,
  }),
]

let plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  }),
  new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    disable: dev,
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    __DEV__: dev,
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
]


if (!dev) {
  plugins = plugins.concat(productionPlugins)
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ])
}

const stats = {
  hash: false,
  colors: true,
  timings: true,
  chunks: false,
  assets: false,
  version: false,
  reasons: false,
  children: false,
  chunkModules: true,
}

module.exports = {
  stats,
  devServer: {
    stats,
    hotOnly: true,
    historyApiFallback: true,
  },
  devtool: dev ? 'eval' : false,
  entry: {
    bundle: dev ? [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index',
    ] : [
      'babel-polyfill',
      './src/index',
    ],
  },
  output: {
    publicPath: dev ? '/' : './',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: 1,
                context: '/',
                modules: 1,
                importLoaders: 1,
                localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : '',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
        include: [
          path.join(__dirname, 'src', 'components'),
          path.join(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                context: '/',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
        include: [
          path.join(__dirname, 'src', 'styles'),
          path.join(__dirname, 'node_modules'),
        ],
        exclude: [
          path.join(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]',
        include: [
          path.join(__dirname, 'src', 'assets'),
          path.join(__dirname, 'node_modules'),
        ],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
  plugins,
}
