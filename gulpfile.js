var gulp = require('gulp');

var concatCss = require('gulp-concat-css');
var rebaseUrls = require('gulp-css-rebase-urls');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

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