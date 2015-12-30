var gulp = require('gulp');

gulp.task('copy', function() {
  return gulp.src('./src/test.html')
    .pipe(gulp.dest('./dist'));
});

// messageの前に実行したいcopyを第2引数に入れる
gulp.task('message', ['copy'], function() {
  console.log('copy done');
});

gulp.task('default', ['message']);