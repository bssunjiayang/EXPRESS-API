var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task("admin_lte", function () {
    gulp
        .src("./node_modules/admin-lte/dist/**/*.css")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest('./app/public/css/dist'));

    gulp
        .src("./node_modules/admin-lte/dist/**/*.css.map")
        .pipe(gulp.dest('./app/public/css/dist'));

    gulp
        .src("./node_modules/admin-lte/dist/js/**/*.js")
        .pipe(gulp.dest('./app/public/js/dist'));

    gulp
        .src("./node_modules/admin-lte/dist/img/**/*")
        .pipe(gulp.dest('./app/public/img/dist'));

    gulp
        .src("./node_modules/admin-lte/plugins/**/*.css")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest('./app/public/css/plugins'));

    gulp
        .src([
            "./node_modules/admin-lte/plugins/**/*.js",
            "./node_modules/admin-lte/plugins/**/*.js.map"
        ])
        .pipe(gulp.dest('./app/public/js/plugins'));

    gulp
        .src([
            "./node_modules/admin-lte/plugins/**/*.eot",
            "./node_modules/admin-lte/plugins/**/*.svg",
            "./node_modules/admin-lte/plugins/**/*.ttf",
            "./node_modules/admin-lte/plugins/**/*.woff",
            "./node_modules/admin-lte/plugins/**/*.woff2"
        ])
        .pipe(gulp.dest('./app/public/css/plugins'));
});