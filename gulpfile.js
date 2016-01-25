'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

/*
	A more sophisticated browserify build & watch
	https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 */

// add custom browserify options here
var customOpts = {
  app: {
    entries: ['./src/js/app.js'],
    debug: true,
    dest: { fileName: 'bundle.js', path: './dist' }
  }
};

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    port: process.env.PORT || 5000
  });
});

function bundle(bundler, options) {
  options = options || {};
  return bundler.bundle()
    // log errors if they happen
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source(options.fileName))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(options.path))
    .pipe(livereload());
}

// you can run `gulp js` to build the file
gulp.task('js', function(){
  var opts = assign({}, browserify.args, customOpts.app);
  var b = browserify(opts);
  // add transformations here
  // i.e. b.transform(coffeeify);
  return bundle(b, customOpts.app.dest);
});

gulp.task('watchify', function(){
  var opts = assign({}, watchify.args, customOpts.app);
  var b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);

  b.on('update', bundle.bind(null, b, customOpts.app.dest)); // on any dep update, runs the bundler
  b.on('log', util.log); // output build logs to terminal

  return bundle(b, customOpts.app.dest);
});

gulp.task('html', function(){
	gulp.src([
    './src/**/*.html',
  ])
		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
});

gulp.task('images', function(){
	gulp.src([
    './src/images/**/*',
  ])
		.pipe(gulp.dest('./dist/images'))
		.pipe(livereload());
});

gulp.task('css', function(){
	gulp.src([
    './node_modules/angular-material/angular-material.css',
    './src/css/*.css'
  ])
		.pipe(gulp.dest('./dist/css'))
		.pipe(livereload());
});

gulp.task('clean', function(done) {
  del(['./dist'], done);
});

gulp.task('watch', ['watchify'], function() {
    livereload.listen({
      port: process.env.LIVERELOAD_PORT || 35729
    });

    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/css/*.css'], ['css']);


});


gulp.task('build', ['html', 'css', 'images', 'js']);

gulp.task('default', ['connect', 'watch']);
