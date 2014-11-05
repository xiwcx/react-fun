var browserify  = require('browserify');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var reactify    = require('reactify');
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');

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
