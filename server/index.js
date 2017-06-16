const path = require('path')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const ENV = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8888

const app = express()

app.set('port', port)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if (ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config.babel')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      hash: false,
      colors: true,
      timings: true,
      chunks: false,
      assets: false,
      version: false,
      reasons: false,
      children: false,
      chunkModules: true,
    },
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, // eslint-disable-line
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render({
    message: err.message,
    error: ENV === 'development' ? err : {},
  })
})

app.listen(app.get('port'), () => (
  console.log('Server listening on port:', app.get('port'))
))
