const express = require('express');
require('dotenv').config()
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
 
const config = require('../config/config.js');
const webpackConfig = require('../webpack.config');


const isDev = process.env.MONGODB_URI !== 'production';
const port  = process.env.PORT || 8080;


// Configuration
// ================================================================================================

// // Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/login');
mongoose.Promise = global.Promise;



// mongoose.connect(process.env.MONGODB_URI || '');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
});

module.exports = app;
