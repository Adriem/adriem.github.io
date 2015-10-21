/* GULP DEPENDENCIES */
var gulp    = require("gulp"),
    del     = require("del"),
    path    = require("path"),
    coffee  = require("gulp-coffee"),
    uglify  = require("gulp-uglify"),
    cssmin  = require("gulp-minify-css"),
    htmlmin = require("gulp-minify-html"),
    util    = require("gulp-util"),
    inject  = require("gulp-inject"),
    maps    = require("gulp-sourcemaps"),
    rename  = require("gulp-rename");
    less    = require("gulp-less");
    open    = require("gulp-open");

/* Default gulp task */
gulp.task("default", ["build"], function(){});

/* IMG TASKS */
gulp.task("move-img", function(){
    return gulp.src("./src/img/*")
        .pipe(gulp.dest("./dist/img"))
});

/* FONT TASKS */
gulp.task("move-fonts", function(){
    return gulp.src(["./src/fonts/**/*", "!./src/fonts/**/*.css"])
        .pipe(gulp.dest("./dist/fonts"))
});

/* JSON TASKS */
//gulp.task("move:json", function(){
//    return gulp.src("./src/**/*.json")
//        .pipe(gulp.dest("./dist/"))
//});

/* CSS TASKS */
gulp.task('clean-css', function (cb) {
    del(["./dist/**/*.css"], cb);
});

gulp.task("less", ["clean-css"], function() {
    return gulp.src("./src/**/*.less")
        .pipe(less({
            paths: [ path.join(__dirname, 'src') ]
         }))
        .pipe(gulp.dest("./dist/"));

});

gulp.task("css", ["less"], function(){
    return gulp.src("./src/**/*.css")
        .pipe(cssmin())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest("./dist/"))
});

/* COFFEESCRIPT TASKS */
gulp.task('clean-js', function (cb) {
    del(['./dist/**/*.js'], cb);
});

gulp.task("coffee:dev", ["clean-js"], function() {
    return gulp.src("./src/**/*.coffee")
        .pipe(maps.init())
        .pipe(coffee({bare: true}).on('error', util.log))
        .pipe(maps.write())
        .pipe(gulp.dest("./dist/"))
});

gulp.task("coffee", ["clean-js"], function() {
    return gulp.src("./src/**/*.coffee")
        .pipe(maps.init())
        .pipe(coffee({bare: true}).on('error', util.log))
        .pipe(uglify({mangle:false}))
        .pipe(rename({
            extname: ".min.js"
        }).on('error', util.log))
        .pipe(maps.write())
        .pipe(gulp.dest("./dist/"))
});

/* HTML TASKS */
gulp.task("clean-html", function(cb) {
    del(['./dist/**/*.html'], cb);
});

gulp.task("move-html", ["clean-html"], function(){
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist/"))
});

/* BUILD TASKS */
gulp.task("build:dev", ["move-html", "move-img", "move-fonts", "css", "coffee:dev"], function(){
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
    gulp.src("./dist/**/*.html")
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest("./dist"))
});

gulp.task("build", ["move-html", "move-img", "move-fonts", "css", "coffee"], function(){
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
    gulp.src("./dist/**/*.html")
        .pipe(inject(sources, {relative: true}))
        .pipe(htmlmin({
            empty: true,
            cdata: false,
            comments: false,
            conditionals: false,
            spare: false,
            quotes: false,
            loose: true
        }))
        .pipe(gulp.dest("./dist"))
});

gulp.task("launch", ["build"], function() {
    gulp.src("./dist/index.html").pipe(open("", {url:"http://localhost:8082"}))
});

gulp.task("launch:dev", ["build:dev"], function() {
    gulp.src("./dist/index.html").pipe(open("", {url:"http://localhost:8082"}))
});
