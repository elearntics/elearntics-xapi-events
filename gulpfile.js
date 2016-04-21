var gulp = require('gulp')
var jshint = require('gulp-jshint')
var watch = require('gulp-watch')
var scriptsToWatch = ['./lib/*.js', './test/*.js']

gulp.task('lint', function () {
  return gulp.src(scriptsToWatch)
    .pipe(watch(scriptsToWatch))
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
})

gulp.task('default', ['lint'])
