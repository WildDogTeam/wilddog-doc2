var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var del = require('del');
const revReplace = require("gulp-rev-replace");
const runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['dist', 'rev']);
});

gulp.task('copy', function() {
    return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.{jpg,png,svg,gif}'], {
            base: 'public'
        })
        .pipe(gulp.dest('dist/'))
});

gulp.task('uglify', function() {
    return gulp.src('public/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('cssmin', function() {
    return gulp.src('public/css/*')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
})

gulp.task("rev", function() {
    return gulp.src(['dist/css/**/*.css', 'dist/js/**/*.js', 'dist/images/**/*.{jpg,png,svg,gif}'], {
            base: "dist"
        })
        .pipe(rev())
        .pipe(gulp.dest("dist"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev"))
})

gulp.task("revreplace", function() {
    var manifest = gulp.src("rev/**/*.json");
    return gulp.src(["dist/js/**/*.js", "dist/css/**/*.css", "dist/**/*.html"], {
            base: "dist"
        })
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('build', function(cb) {
    runSequence('clean', 'copy', ['uglify', 'cssmin'], 'rev', 'revreplace');
});

gulp.task('imagesMin', function() {
    return gulp.src('themes/navy/source/images/**/*.{jpg,png,svg,gif}', {
            base: 'themes'
        })
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            multipass: true,
            svgoPlugins: [{ removeViewBox: true }],
            verbose: true,
        }))
        .pipe(gulp.dest('themes'))
})