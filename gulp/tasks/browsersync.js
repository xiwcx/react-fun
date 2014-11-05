var browserSync = require('browser-sync');
var gulp        = require('gulp');

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: [
        ".tmp/",
        "app/"
      ]
    }
  });
});
