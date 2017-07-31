var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),    
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var env, jsSources,
    sassSources, htmlSources,
    outputDir, sassStyle;

env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
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
        .pipe(buffer())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    .pipe(compass({
        css: outputDir + 'css',
        sass: 'components/sass',
        image: outputDir + 'images',
        style: sassStyle
    })
    .on('error', gutil.log))
    // .pipe(gulp.dest(outputDir + 'css'))
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
