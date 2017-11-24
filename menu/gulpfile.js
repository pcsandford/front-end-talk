const gulp = require("gulp"),
      sass = require("gulp-sass"),
      cssmin = require("gulp-cssmin"),
      plumber = require("gulp-plumber"),
      concat = require("gulp-concat"),
      autoprefixer = require("gulp-autoprefixer"),
      rename = require("gulp-rename"),
      notify = require("gulp-notify");

const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task("styles", () => {
  gulp.src("src/**/*.scss")
    .pipe(plumber())
    .pipe(sass().on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 😱'
        })))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("build/styles"))
    .pipe(reload({stream:true}))
});

gulp.task("watch", () => {
  gulp.watch("src/**/*.scss", ["styles"]);
});

gulp.task("browser-sync", () => {
  browserSync({
    port: 8000,
    server: {
      baseDir:"."
    }
  });
});

gulp.task("default", ["styles", "watch", "browser-sync"]);