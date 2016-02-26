'use_strict';

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './index.js',
    html: './index.html',
    css: './index.css',
  },

  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,

        // NOTE: presetを指定しないとbabel6系は動かない
        loaders: [
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
          // 'preprocess?' + JSON.stringify({ ENV_CONFIG: ENV_CONFIG }),
        ],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },

  // plugins: plugins,
  debug: true,
  devtool: '#source-map',
  cache: true,
};
