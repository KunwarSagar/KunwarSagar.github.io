//imports gulp
const gulp = require("gulp");
//imports image optimizer
const imagemin = require("gulp-imagemin");
//imports js minifier
const uglify = require("gulp-uglify");
//imports sass compiler
const sass = require("gulp-sass");
//imports js concatinator
const concat = require("gulp-concat");

// Gulp top level functions
//gulp.task - Define Task
//gulp.src - Point to files to use / Source Folder
//gulp.dest - Point to folde to output / production code
//gulp.watch - Wathc files and folders for changes


//Copy HTML
gulp.task("copyHtml", async function () {
  //copyHtml can be anything
  //src is src folder and *.html represents every html files (similarly we can do for other types of files)
  gulp.src("src/*.html").pipe(gulp.dest("public")); //public is a destination folder
});

// Optimize image
gulp.task("imageMin", () => {
  const l1 = gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images"));

  const l2 = gulp
    .src("src/images/gallery/fulls/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images/gallery/fulls"));

  const l3 = gulp
    .src("src/images/gallery/thumbs/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images/gallery/thumbs"));
  return l1, l2, l3;
});

//Minify JS
// -- commenting because we are using concatinator
// gulp.task("minifyJs", function() {
//   gulp
//     .src("src/assets/js/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("public/assets/js"));
// });

//Compile Sass
gulp.task("sass", function () {
  return gulp
    .src([
      "src/assets/sass/*.scss",
      "node_modules/bootstrap/scss/bootstrap.scss"
    ])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/assets/css"));
});

//Js Concatinator + JS Minify by uglify
gulp.task("scripts", async function () {
  gulp
    .src([
      "src/js/*.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public/assets/js"));
});

// Constantly Watch
gulp.task("watch", function () {
  gulp.watch("src/*.html", gulp.series("copyHtml"));
  gulp.watch("src/images/*", gulp.series("imageMin"));
  gulp.watch("src/assets/sass/*.scss", gulp.series("sass"));
  gulp.watch("src/assets/js/*.js", gulp.series("scripts"));
});
//Default Task, We add everything in an array to make it automatic
gulp.task(
  "default",
  gulp.parallel("copyHtml", "imageMin", "sass", "scripts", "watch")
);