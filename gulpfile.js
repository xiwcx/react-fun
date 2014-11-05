var browserify  = require('browserify');
var browserSync = require('browser-sync');
var del         = require('del');
var gulp        = require('gulp');
var reactify    = require('reactify');
var reload      = browserSync.reload;
var source      = require('vinyl-source-stream');

gulp.task('clean', function() {
  del(['.tmp', 'dist'] );
});

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

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./app/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./.tmp/scripts/'));
});

gulp.task('default', ['clean', 'browserify', 'browser-sync'], function () {
    gulp.watch( ["app/*.html", ".tmp/scripts/**.*js"], reload );
    gulp.watch( ["app/scripts/**/*.{js/jsx}"], ['browserify', 'reload'])
});
