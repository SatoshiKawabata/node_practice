// コンフィグファイル

var path = require('path');
var dest = "./build";
var src = "./src";
var relativeSrcPath = path.relative('.', src);

module.exports = {
  dest: dest,

  js: {
    src: src + "/js/**",
    dest: dest + "/js",
    uglify: false
  },

  // webpack
  webpack: {
    entry: src + "/js/app.js",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      // babel-loaderでES6を使えるように
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // loader: 'babel-loader?stage=0&experimental&optional=selfContained'
          loader: 'babel',
          query: {
            presets: [
              'es2015',
              'stage-0'
            ]
          }
        }
      ]
    }
  },
  copy: {
    src: [
      src + '/www/index.html'
    ],
    dest: dest
  },

  // stylus
  stylus: {
    src: [
      src + '/styl/**/!(_)*'
    ],
    dest: dest + '/css/',
    output: 'app.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  },

  // watch
  watch: {
    js: relativeSrcPath + '/js/**',
    styl: relativeSrcPath + '/styl/**',
    www: relativeSrcPath + '/www/index.html'
  }
};