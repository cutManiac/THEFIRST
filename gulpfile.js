var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

/* script variables */
var stylDev = assetsDev + 'styl/*.styl';
var tsDev = appDev + '**/*.ts';
var imgDev = assetsDev + 'img/**/*.{jpg,png}';
var svgDev = assetsDev + 'img/**/*.svg';
var fontDev = assetsDev + 'fonts/**/*';
var htmlDev = appDev + '**/*.html';
var jsDev = assetsDev + 'js/**/*.js';

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var ignore = require('gulp-ignore');
var del = require('del');
var newer = require('gulp-newer');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var stylus = require('gulp-stylus');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('clean:src', function () {
    return del('src');
});

gulp.task('clean:app', function () {
    return del('app');
});

gulp.task('clean', gulp.parallel('clean:app','clean:src'));

/* STYLUS */
gulp.task('build:styl', function () {
    return gulp.src(stylDev)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assetsProd + 'css/'));
});

/* TYPESCRIPT */
gulp.task('build:ts', function () {
    return gulp.src(tsDev)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

/* IMAGES */
gulp.task('build:img', function () {
    return gulp.src(imgDev)
        .pipe(ignore.exclude(['thumbnails', 'thumbnails/*']))
        .pipe(newer(assetsProd + 'img/'))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

/* SVG */
gulp.task('build:svg', function () {
    return gulp.src(svgDev)
        .pipe(newer(assetsProd + 'img/'))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

/* FONTS */
gulp.task('build:fonts', function () {
    return gulp.src(fontDev)
        .pipe(newer(assetsProd + 'fonts/'))
        .pipe(gulp.dest(assetsProd + 'fonts/'));
});

/* JS */
gulp.task('build:js', function () {
    return gulp.src(jsDev)
        .pipe(newer(assetsProd + 'js/'))
        .pipe(jsuglify())
        .pipe(gulp.dest(assetsProd + 'js/'));
});

/* HTML */
gulp.task('build:html', function () {
    return gulp.src(htmlDev)
        .pipe(gulp.dest(appProd));
});

gulp.task('build', gulp.parallel('build:ts', 'build:styl', 'build:html', 'build:img', 'build:svg', 'build:fonts', 'build:js'));

gulp.task('watch', function () {
    gulp.watch(tsDev, gulp.series('build:ts'));
    gulp.watch(stylDev, gulp.series('build:styl'));
    gulp.watch(imgDev, gulp.series('build:img'));
    gulp.watch(svgDev, gulp.series('build:svg'));
    gulp.watch(fontDev, gulp.series('build:fonts'));
    gulp.watch(jsDev, gulp.series('build:js'));
    gulp.watch(htmlDev, gulp.series('build:html'));
});

gulp.task('default', gulp.series('build', 'watch'));