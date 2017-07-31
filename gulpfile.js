var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var imagemin = require('gulp-imagemin');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var gulpsync = require('gulp-sync')(gulp);
require('events').EventEmitter.prototype._maxListeners = 100;

gulp.task('clean', function() {
    del.sync(['dist/**/*', 'rev/**/*'])
})

gulp.task('imagerev', function() {
    gulp.src('public/images/*')
        // .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/images'))
        .on('end', function() {
            gulp.start('rev')
        })
})

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

gulp.task('uglify', function() {
    gulp.src('public/js/*')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .on('end', function() {
            setTimeout(function() {
                gulp.start('cssmin')
            }, 500)
        })
})

gulp.task('cssmin', function() {
    gulp.src('public/css/*')
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
        .on('end', function() {
            gulp.start('imagerev')
        })
})

gulp.task('rev', function() {
    gulp.src(['rev/**/*.json', 'public/**/*.html', 'dist/**/*.css'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'))
})

gulp.task('build', gulpsync.sync(['clean', ['uglify']]));