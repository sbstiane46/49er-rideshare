const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;

  case 'dev':
  case 'development':
  case 'style':
  default:
    module.exports = require('./config/webpack.dev');
}

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
