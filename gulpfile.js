var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var del = require('del');
var path = require('path');

var targetDir = 'src/main/resources/static/dist/';

var componentRoot = 'src/main/webapp/js';
var appEntry = componentRoot + 'index.js';

var exTargetDir = 'target/classes/static/dist';

gulp.task("webpack", function () {
  var webpackConfig = require('./webpack.config.js');
  return gulp.src(appEntry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(targetDir))
});

gulp.task('watch:script', function () {
  var webpackConfig = require('./webpack.config.js');
  webpackConfig['watch'] = true;
  return gulp.src(appEntry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(targetDir));
});

gulp.task('watch:target', function () {
  var targetPath = path.resolve(targetDir, '*');
  return gulp.src(targetPath)
    .pipe(watch(targetPath))
    .pipe(debug({title: 'syncing:'}))
    .pipe(gulp.dest(exTargetDir));
});

gulp.task('watch', ['watch:script', 'watch:target']);

gulp.task('format', function () {
  return gulp.src('src/main/webapp/js/**/*')
    .pipe(gulp.dest('src/main/webapp/js/'));
});

gulp.task('clean', function () {
  return del([
    'dist/**',
    'node_modules/**/*'
  ]);
});

gulp.task('default', ['webpack'], function () {

});



