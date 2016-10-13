var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('stylus', function() {
  return(
    gulp.src('stylus/grid.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/'))
  )
});

gulp.task('mincss', function() {
  return(
    gulp.src('dist/grid.css')
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
  )
});

gulp.task('pug', function() {
  return(
    gulp.src('*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
  )
});

gulp.task('sass', function() {
  return(
    gulp.src('demo/sass/style.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(gulp.dest('demo/css/'))
  )
});

gulp.task('js', function() {
  return(
    gulp.src('demo/js/script.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('demo/js/'))
  )
});

gulp.task('build', ['pug', 'stylus', 'mincss', 'js', 'sass']);

gulp.task('watch', function() {
  gulp.watch('*.pug', ['pug']);
  gulp.watch('stylus/grid.styl', ['stylus']);
  gulp.watch('dist/grid.css', ['mincss']);
  gulp.watch('demo/js/script.js', ['js']);
  gulp.watch('demo/sass/style.sass', ['sass']);
});

gulp.task('default', ['build', 'watch']);
