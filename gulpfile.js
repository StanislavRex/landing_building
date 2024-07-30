// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');

// gulp.task('sass', function() {
//     return gulp.src('src/scss/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'));
// });

// gulp.task('scripts', function() {
//     return gulp.src('src/js/**/*.js')
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('images', function() {
//     return gulp.src('src/images/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'));
// });

// gulp.task('watch', function() {
//     gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
//     gulp.watch('src/js/**/*.js', gulp.series('scripts'));
//     gulp.watch('src/images/**/*', gulp.series('images'));
// });

// gulp.task('default', gulp.parallel('sass', 'scripts', 'images', 'watch'));
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const paths = {
    styles: {
        src: 'scss/**/*.scss',
        dest: 'css'
    },
    scripts: {
        src: 'js/**/*.js',
        dest: 'js'
    },
    images: {
        src: 'images/**/*',
        dest: 'images'
    },
    html: {
        src: './*.html'
    }
};

// Compile SCSS into CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Minify JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// Optimize Images
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Watch files for changes
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: '/landing.html' // Додайте цю лінію, щоб вказати стартову сторінку
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

const build = gulp.series(gulp.parallel(styles, scripts, images), watch);

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.build = build;

gulp.task('default', build);


