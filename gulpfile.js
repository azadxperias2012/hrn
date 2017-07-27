var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

var jsSources = [
    'components/scripts/index.js'
];

var sassSources = [ 'components/sass/style.scss' ];

gulp.task('js', function() {
    var bundleStream = browserify(jsSources).bundle();

    bundleStream
        .pipe(source('script.js'))
        .pipe(gulp.dest('builds/development/js'))
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
});