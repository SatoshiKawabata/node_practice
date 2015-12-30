// gulpタスク: stylusのコンパイルと最適化

var gulp = require('gulp');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var config = require('../config').stylus;

gulp.task('stylus', function() {
  gulp.src(config.src)
    .pipe(plumber()) // エラー出ても止まらないように
    .pipe(stylus()) // コンパイル
    .pipe(concat(config.output)) // まとめる
    .pipe(autoprefixer(config.autoprefixer)) // vender-prefixをつける
    .pipe(gulpif(config.minify, minify())) // minify
    .pipe(gulp.dest(config.dest)); // 出力
});