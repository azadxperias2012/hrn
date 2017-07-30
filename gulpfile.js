var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var jsSources = [
    'components/scripts/index.js',
    'components/scripts/toggleMenu.js'
];

var sassSources = [ 'components/sass/style.scss' ];

gulp.task('js', function() {
    var bundleStream = browserify(jsSources).bundle();

    bundleStream
        .pipe(source('script.js'))
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch("components/sass/*.scss", ['compass']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

gulp.task('default', ['js', 'compass', 'connect', 'watch']);
