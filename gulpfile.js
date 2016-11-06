'use strict';

/* Libraries */
let
  browserify  = require('browserify'),
  buffer      = require('vinyl-buffer'),
  connect     = require('gulp-connect'),
  gulp        = require('gulp'),
  livereload  = require('gulp-livereload'),
  source      = require('vinyl-source-stream'),
  sourcemaps  = require('gulp-sourcemaps'),
  uglify      = require('gulp-uglify')
;

/* Config */
const
  BABEL_CONFIG = Object.freeze({
    presets: ['es2015']
  }),
  BROWSERIFY_TRANSFORM = 'babelify',
  BROWSERIFY_CONFIG = Object.freeze({
    debug: true,
    json: true
  }),
  DIST_FILENAME      = 'xapi-events.js',
  DIST_PATH          = 'dist',
  DIST_TEST_FILENAME = 'test.xapi-events.js',
  DIST_TEST_PATH     = 'dist-test',
  MAPS_PATH          = './maps',
  SRC_FILE           = 'lib/xAPI-events.js',
  SRC_TEST_FILE      = 'test/test.main.js',
  WATCH_FILES        = ['lib/*.js', 'lib/**/*.js', 'test/*.js', 'test/**/*.js']
;

/* Task Config */

const
  BUILD_TASK       = 'build',
  BUILD_TEST_TASK  = 'build-test',
  CONNECT_TASK     = 'connect',
  DEFAULT_TASK     = 'default',
  DEFAULT_TASKS    = [BUILD_TASK, BUILD_TEST_TASK],
  WATCH_TASK       = 'watch',
  WATCH_TASKS      = [BUILD_TASK, BUILD_TEST_TASK]
;

gulp.task(BUILD_TASK, () => {
  return browserify(SRC_FILE, BROWSERIFY_CONFIG)
    .transform(BROWSERIFY_TRANSFORM, BABEL_CONFIG)
    .bundle()
    .pipe(source(DIST_FILENAME))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write(MAPS_PATH))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task(BUILD_TEST_TASK, () => {
  return browserify(SRC_TEST_FILE, BROWSERIFY_CONFIG)
    .transform(BROWSERIFY_TRANSFORM, BABEL_CONFIG)
    .bundle()
    .pipe(source(DIST_TEST_FILENAME))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write(MAPS_PATH))
    .pipe(gulp.dest(DIST_TEST_PATH))
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
