var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

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

gulp.task('clean', ['clean:app','clean:src']);

gulp.task('build:scss', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build:styl', function () {
    return gulp.src(assetsDev + 'styl/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build:ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('build:img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(ignore.exclude(['thumbnails', 'thumbnails/*']))
        .pipe(newer(assetsProd + 'img/'))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build:fonts', function () {
    return gulp.src(assetsDev + 'fonts/**/*')
        .pipe(newer(assetsProd + 'fonts/'))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'fonts/'));
});

gulp.task('build:html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('build', ['build:ts', 'build:styl', 'build:html', 'build:img', 'build:fonts']);

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build:ts']);
    //gulp.watch(assetsDev + 'scss/**/*.scss', ['build:scss']);
    gulp.watch(assetsDev + 'styl/**/*.styl', ['build:styl']);
    gulp.watch(assetsDev + 'img/*', ['build:img']);
    gulp.watch(assetsDev + 'fonts/*', ['build:fonts']);
    gulp.watch(appDev + '**/*.html', ['build:html']);
});

gulp.task('default', ['watch', 'build']);