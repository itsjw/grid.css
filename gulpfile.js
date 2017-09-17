const gulp = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const groupcss = require('gulp-group-css-media-queries')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')

gulp.task('gridStyles', () => {
  return (
    gulp.src('./src/grid.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(groupcss())
    .pipe(gulp.dest('./dist/'))
  )
})

gulp.task('gridStylesMin', ['gridStyles'], () => {
  return (
    gulp.src('./dist/grid.css')
    .pipe(plumber())
    .pipe(csso())
    .pipe(rename('grid.min.css'))
    .pipe(gulp.dest('./dist/'))
  )
})

gulp.task('babel', () => {
  return (
    gulp.src('./site/babel/main.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./site/js/'))
  )
})

gulp.task('babelmin', ['babel'], () => {
  return (
    gulp.src('./site/js/main.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./site/js/'))
  )
})

gulp.task('stylus', () => {
  return (
    gulp.src('./site/stylus/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(groupcss())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./site/css/'))
  )
})

gulp.task('stylusmin', ['stylus'], () => {
  return (
    gulp.src('./site/css/main.css')
    .pipe(plumber())
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./site/css/'))
  )
})

gulp.task('imagemin', () => {
  return (
    gulp.src('./site/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./site/img/'))
  )
})

gulp.task('watch', () => {
  gulp.watch('./site/babel/*.js', ['babelmin'])
  gulp.watch('./site/stylus/*.styl', ['stylusmin'])
  gulp.watch('./src/*.styl', ['gridStylesMin'])
})

gulp.task('build', ['gridStyles', 'babel', 'stylus', 'imagemin'])