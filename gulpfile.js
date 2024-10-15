const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}

function scripts() {
  return gulp
    .src('./src/scripts/*.js', { encoding: false })
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return gulp
    .src('./src/fonts/*.{woff,woff2}', { encoding: false })
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

function html() {
  return gulp
    .src('./src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src('./src/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src('./src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', {
      encoding: false,
    })
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('./dist');
}

const build = gulp.series(
  clean,
  gulp.parallel(html, css, images, fonts, scripts)
);

function watchFiles() {
  gulp.watch(['./src/**/*.html'], html);
  gulp.watch(['./src/**/*.css'], css);
  gulp.watch(['./src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['./src/fonts/*.{woff,woff2}'], fonts);
  gulp.watch(['./src/scripts/*.js'], scripts);
}

const watchapp = gulp.parallel(build, watchFiles, serve);

exports.clean = clean;
exports.images = images;
exports.css = css;
exports.html = html;
exports.fonts = fonts;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
