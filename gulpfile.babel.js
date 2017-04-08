"use strict";

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';

gulp.task('connect', () => {
  browserSync.init({
      port: 3000,
      online: true,
      server: {
          baseDir: "./dist"
      }
  });
});

gulp.task('compile:css', () => {
  return gulp.src('./src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass().on('error', sass.logError)
    )
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(
      sourcemaps.write()
    )
    .pipe(
      gulp.dest('./dist/assets/css')
    ).pipe(browserSync.stream());
});

gulp.task('compile:js', () => {
  return browserify({entries: './src/scripts/index.js', debug: true})
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message + err.stack);
      this.emit("end")
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('connect:html', () => {
  gulp.src('./dist/*.html')
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch(['./src/scss/**/*.scss'], ['compile:css']);
  gulp.watch(['./src/scripts/**/*.js'], ['compile:js']);
  gulp.watch(['./dist/*.html'], ['connect:html']);
});

gulp.task('default', ['connect', 'watch', 'compile:css', 'compile:js', 'connect:html']);
