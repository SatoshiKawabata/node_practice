// gulpタスク: webpack

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack'),
    config = require('../config');

gulp.task('webpack', function() {
  gulp.src(config.webpack.entry)
    .pipe(webpack(config.webpack))
    .pipe(gulpif(config.js.uglify, uglify()))
    .pipe(gulp.dest(config.js.dest));
});