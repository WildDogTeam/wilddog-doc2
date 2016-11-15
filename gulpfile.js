const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const htmlmin = require('gulp-minify-html');
const revCollector = require('gulp-rev-collector');
const sequence = require('gulp-sequence');

gulp.task('clean', (cb) => {
	gulp.src(['dist', 'rev'], {read: false})
		.pipe(clean())
})

gulp.task('imagerev', () => {
	gulp.src('public/images/*')
		.pipe(rev())
		.pipe(gulp.dest('dist/images'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/images'))
		.on('end', function () {
			gulp.start('imagemin')
		})
})

gulp.task('imagemin', () => {
	gulp.src('dist/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
		.on('end', function () {
			gulp.start('rev')
		})
})

gulp.task('uglify', ['clean'],() => {
	gulp.src('public/js/*')
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/js'))
		.on('end', function () {
			setTimeout(function () {
				gulp.start('cssmin')
			}, 500)
		})
})

gulp.task('cssmin', () => {
	gulp.src('public/css/*')
		.pipe(cssmin())
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/css'))
		.on('end', function () {
			gulp.start('imagerev')
		})
})

gulp.task('rev', () => {
	gulp.src(['rev/**/*.json', 'public/**/*.html', 'dist/**/*.css'])
		.pipe(revCollector())
		.pipe(htmlmin({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('build', ['clean' ,'uglify']);
