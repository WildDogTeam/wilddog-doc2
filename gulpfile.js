const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const htmlmin = require('gulp-minify-html');
const revCollector = require('gulp-rev-collector');
const sequence = require('gulp-sequence');
const del = require('del');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('clean', function () {
	del.sync(['dist/**/*', 'rev/**/*'])
})

gulp.task('imagerev', () => {
	gulp.src('public/images/*')
		.pipe(imagemin())
		.pipe(rev())
		.pipe(gulp.dest('dist/images'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/images'))
		.on('end', function () {
			gulp.start('rev')
		})
})

// gulp.task('imagemin', () => {
// 	gulp.src('dist/images/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/images'))
// 		.on('end', function () {
// 			gulp.start('rev')
// 		})
// })

gulp.task('uglify', () => {
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

gulp.task('build', gulpsync.sync(['clean', ['uglify']]));
