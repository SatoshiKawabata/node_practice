// gulpタスク: コピー

var gulp = require('gulp'),
    config = require('../config').copy;

gulp.task('copy', function() {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});