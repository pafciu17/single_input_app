var gulp = require('gulp'),
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream')
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    babel = require('gulp-babel'),
    babelify = require("babelify");


var options = {
    distTargetDir: './app-build/image-browser/www'
}

gulp.task('serve', ['browserify'], function() {
    connect.server({
        root: 'src',
        port: 8002,
        livereload: true
    });
});

gulp.task('reload', ['browserify'], function() {
    console.log('reload');
    return gulp.src(['src/**'])
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    return gulp.watch(['src/**', '!src/build/**'], ['reload']);
});

gulp.task('browserify', function(){
    var b = browserify({
        entries: ['./src/js/main.js'],
        debug: true,
        transform: [babelify, reactify]
    });
    return b.bundle()
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(source('main.js'))
        .pipe(rename(function(path) {
            path.basename = 'bundle';
        }))
        .pipe(gulp.dest('src/build/'));
});


gulp.task('build', function() {
    var filesForDist = gulpFilter(['**', '!js/**', 'js/bundle.js']),
        jsFiles = gulpFilter('**/*.js');

    return gulp.src('src/**')
        .pipe(filesForDist)
        .pipe(jsFiles)
        .pipe(uglify())
        .pipe(jsFiles.restore())
        .pipe(gulp.dest(options.distTargetDir));
});

gulp.task('default', ['serve', 'watch']);