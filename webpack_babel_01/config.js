module.exports = {
  js: {
    src: './src/js/**',
    dest: './build/js'
  },
  webpack: {
    entry: './src/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
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
  }
};