'use strict';

const browserify  = require('browserify');
const buffer      = require('vinyl-buffer');
const connect     = require('gulp-connect');
const gulp        = require('gulp');
const livereload  = require('gulp-livereload');
const source      = require('vinyl-source-stream');
const sourcemaps  = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');

const
  BABEL_CONFIG = Object.freeze({
    presets: ['es2015']
  }),
  BROWSERIFY_TRANSFORM = 'babelify',
  BROWSERIFY_CONFIG = Object.freeze({
    debug: true,
    json: true,
    standalone: 'xapiEvents'
  }),
  DIST_FILENAME      = 'xapi-events.js',
  DIST_FILENAME_MIN  = 'xapi-events.min.js',
  DIST_PATH          = 'dist',
  MAPS_PATH          = './maps',
  SRC_FILE           = 'src/index.js',
  WATCH_FILES        = ['src/*.js', 'src/**/*.js', 'test/*.js', 'test/**/*.js']
;

/* Task Config */

const
  BUILD_TASK       = 'build',
  BUILD_PROD_TASK  = 'build-prod-task',
  CONNECT_TASK     = 'connect',
  DEFAULT_TASK     = 'default',
  DEFAULT_TASKS    = [BUILD_TASK, BUILD_PROD_TASK],
  WATCH_TASK       = 'watch',
  WATCH_TASKS      = [BUILD_TASK]
;

gulp.task(BUILD_TASK, () => {
  return browserify(SRC_FILE, BROWSERIFY_CONFIG)
    .transform(BROWSERIFY_TRANSFORM, BABEL_CONFIG)
    .bundle()
    .pipe(source(DIST_FILENAME))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task(BUILD_PROD_TASK, () => {
  return browserify(SRC_FILE, BROWSERIFY_CONFIG)
    .transform(BROWSERIFY_TRANSFORM, BABEL_CONFIG)
    .bundle()
    .pipe(source(DIST_FILENAME_MIN))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write(MAPS_PATH))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task(WATCH_TASK, WATCH_TASKS, () => {
  livereload.listen();
  connect.server();
  gulp.watch(WATCH_FILES, WATCH_TASKS);
});

gulp.task(CONNECT_TASK, () => {
  connect.server();
});

gulp.task(DEFAULT_TASK, DEFAULT_TASKS);
