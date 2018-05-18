'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var webp = require('gulp-webp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var server = require('browser-sync').create();
var del = require('del');
var run = require('run-sequence');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('style', function() {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('compress-js', function () {
      gulp.src('source/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'))
        .pipe(server.stream());
});

gulp.task('sprite', function () {
  return gulp.src('build/img/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
   gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html', ['html']).on('change', server.reload);
  gulp.watch('source/img/**/*.{png,jpg,svg}', ['images']);
  gulp.watch('source/js/**/*.js', ['compress-js']);
});


gulp.task('copy-base', function () {
  return gulp.src([
    'source/*.html',
    'source/fonts/**/*.{woff,woff2}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});


gulp.task('build', function (done) {
  run('clean', 'style', 'images', 'webp', 'sprite', 'html', 'compress-js', 'copy-base', done);
});
