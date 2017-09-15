var gulp = require('gulp');

var concatCss = require('gulp-concat-css');
var rebaseUrls = require('gulp-css-rebase-urls');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var htmlmin = require('gulp-htmlmin');
var extender = require('gulp-html-extend');
var inject = require('gulp-inject-string');

var rename = require('gulp-rename');

var runSequence = require('gulp-run-sequence');

var ENV = process.env.NODE_ENV || "development";

gulp.task('build-styles', function() {
    return gulp.src('assets/styles/main.css')
        .pipe(concatCss('assets/styles/bundle.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(rebaseUrls())
        .pipe(gulp.dest('./'));
});

gulp.task('minify-styles', function() {
    return gulp.src('assets/styles/bundle.css')
        .pipe(cleanCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('assets/styles/'));
});

gulp.task("templates", function() {
    return gulp.src('templates/pages/*.html')
        .pipe(extender({ annotations:true, verbose:false }))
        .pipe(gulp.dest('.'));
});

gulp.task('html-injection', function() {
    if (ENV !== "production")
        return;

    gulp.src('*.html')
        .pipe(inject.replace("assets/styles/main.css", "assets/styles/bundle.min.css"))
        .pipe(gulp.dest('.'));
});

gulp.task('minify-html', function() {
    gulp.src("*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('.'));
});

gulp.task('build', function() {
    runSequence('build-styles', 'minify-styles', 'templates', 'minify-html', function() {
        setTimeout(function() {
            gulp.run('html-injection');
        }, 1000);
    });
});