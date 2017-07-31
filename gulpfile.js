var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var env, jsSources, sassSources, htmlSources, outputDir;

env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}

jsSources = [
    'components/scripts/index.js',
    'components/scripts/toggleMenu.js'
];
sassSources = [ 'components/sass/style.scss' ];
htmlSources = [ outputDir + '*.html' ];

gulp.task('js', function() {
    var bundleStream = browserify(jsSources).bundle();

    bundleStream
        .pipe(source('script.js'))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
        image: outputDir + 'images',
        style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch("components/sass/*.scss", ['compass']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('default', ['js', 'compass', 'connect', 'watch']);
