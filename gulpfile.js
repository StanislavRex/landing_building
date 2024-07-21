const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('src/images/**/*', gulp.series('images'));
});

gulp.task('default', gulp.parallel('sass', 'scripts', 'images', 'watch'));