var gulp = require('gulp');
var tsc = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

gulp.task('typescript', function () {
    gulp.src('./src/**/*.ts')
        .pipe(tsc({
            module: 'commonjs'
        }))
        .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['typescript'])
})

gulp.task('serve', ['watch'], function () {
    nodemon({
        script: './dist/server/index.js',
        ext: 'js'
    });
});
