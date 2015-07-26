var gulp = require('gulp');
var tsc = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

gulp.task('typescript', function () {
    gulp.src('./src/server/**/*.ts')
        .pipe(tsc({
            module: 'commonjs'
        }))
        .pipe(gulp.dest('./dist/server'))
    ;

    gulp.src('./src/public/*.ts')
        .pipe(tsc({
            module: 'commonjs'
        }))
        .pipe(gulp.dest('./public/dist'))
    ;
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['typescript']);
});

gulp.task('serve', ['typescript', 'watch'], function () {
    nodemon({
        script: './dist/server/index.js',
        ext: 'js'/*,
        env: { PORT: 3001 }*/
    });
});
