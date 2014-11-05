var browserify  = require('browserify');
var browserSync = require('browser-sync');
var del         = require('del');
var gulp        = require('gulp');
var reactify    = require('reactify');
var reload      = browserSync.reload;
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');

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
  browserifyShare();
});

function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b);
  });

  b.transform(reactify);
  b.add('./app/js/main.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./.tmp/scripts/'))
    .pipe(browserSync.reload({stream:true}));
}

gulp.task('default', ['clean', 'browserify', 'browser-sync'], function () {
  gulp.watch( ["app/*.html"], reload );
});
