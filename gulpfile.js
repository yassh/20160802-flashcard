'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

const SCSS_SRC = './docs_src/**/*.scss';
const SCSS_MODULES = './modules/**/*.scss';
const SCSS_DEST = './docs';

const SASS_SETTINGS = {
  outputStyle: 'expanded',
};

const AUTOPREFIXER_SETTINGS = {
  browsers: [
    'Explorer >= 11',
    'Firefox >= 45',
    'Chrome >= 50',
    'iOS >= 9',
  ],
};

gulp.task('build:scss', () => {
  return gulp.src(SCSS_SRC)
    .pipe(sourcemaps.init())
      .pipe(sass(SASS_SETTINGS).on('error', sass.logError))
      .pipe(postcss([ autoprefixer(AUTOPREFIXER_SETTINGS) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(SCSS_DEST));
});

gulp.task('watch:scss', () => {
  gulp.watch([ SCSS_SRC, SCSS_MODULES ], [ 'build:scss' ]);
});
