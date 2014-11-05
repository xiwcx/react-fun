var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('default', ['clean', 'browserify', 'browser-sync'], function () {
  gulp.watch( ["app/*.html"], browserSync.reload );
});
