var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var awsLambda = require("node-aws-lambda");

gulp.task('clean', function() {
	return del(['./dist', './dist.zip']);
});

gulp.task('copy-data', function() {
	return gulp.src('data/**')
		.pipe(gulp.dest('dist/data'));
});

gulp.task('copy-libs', function() {
	return gulp.src('lib/**')
		.pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-js', function (){
	return runSequence(['copy-data'],
		['copy-libs'])
});

gulp.task('copy-alexa-lambda', function() {
	return gulp.src('alexa-lambda.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-lex-lambda', function() {
	return gulp.src('lex-lambda.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('node-mods', function() {
	return gulp.src('./package.json')
		.pipe(gulp.dest('dist/'))
		.pipe(install({production: true}));
});

gulp.task('zip', function() {
	return gulp.src(['dist/**', '!dist/package.json', '!dist/package-lock.json'], {nodir: true})
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('upload-alexa-lambda', function(callback) {
	awsLambda.deploy('./dist.zip', require("./alexa-lambda-config.js"), callback);
});

gulp.task('upload-lex-lambda', function(callback) {
	awsLambda.deploy('./dist.zip', require("./lex-lambda-config.js"), callback);
});

gulp.task('deploy-alexa-lambda', function(callback) {
	return runSequence(
		['clean'],
		['copy-js', 'copy-alexa-lambda'],
		['node-mods'],
		['zip'],
		['upload-alexa-lambda'],
		callback
	);
});

gulp.task('deploy-lex-lambda', function(callback) {
	return runSequence(
		['clean'],
		['copy-js', 'copy-lex-lambda'],
		['node-mods'],
		['zip'],
		['upload-lex-lambda'],
		callback
	);
});