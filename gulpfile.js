let gulp = require('gulp');
let zip = require('gulp-zip');
let del = require('del');
let install = require('gulp-install');
let runSequence = require('run-sequence');
let awsLambda = require("node-aws-lambda");
let AWS = require('aws-sdk');

gulp.task('clean', function() {
	return del(['./dist', './.nyc_output']);
});

gulp.task('copy-data', function() {
	return gulp.src('data/**')
		.pipe(gulp.dest('dist/data'));
});

gulp.task('copy-lib-shared', function() {
	return gulp.src('lib/**')
		.pipe(gulp.dest('dist/lib'));
});

gulp.task('node-mods', function() {
	return gulp.src('./package.json')
		.pipe(gulp.dest('dist/'))
		.pipe(install({production: true}));
});

gulp.task('clean-alexa', function() {
	return del(['./dist-alexa-lambda.zip']);
});

gulp.task('copy-lib-alexa', function() {
	return gulp.src('lib-alexa/**')
		.pipe(gulp.dest('dist/lib-alexa'));
});

gulp.task('copy-alexa-lambda', function() {
	return gulp.src('alexa-lambda.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('zip-alexa-lambda', function() {
	return gulp.src(['dist/**', '!dist/package.json', '!dist/package-lock.json'], {nodir: true})
		.pipe(zip('dist-alexa-lambda.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('upload-alexa-lambda', function(callback) {
	awsLambda.deploy('./dist-alexa-lambda.zip', require("./alexa-lambda-config.js"), callback);
});

gulp.task('build-alexa-lambda', function(callback) {
	return runSequence(
		['clean', 'clean-alexa'],
		['copy-lib-shared', 'copy-data', 'copy-lib-alexa', 'copy-alexa-lambda'],
		['node-mods'],
		['zip-alexa-lambda'],
		callback
	);
});

gulp.task('deploy-alexa-lambda', function(callback) {
	return runSequence(
		['build-alexa-lambda'],
		['upload-alexa-lambda'],
		callback
	);
});

gulp.task('clean-lex', function() {
	return del(['./dist-lex-lambda.zip']);
});

gulp.task('copy-lib-lex', function() {
	return gulp.src('lib-lex/**')
		.pipe(gulp.dest('dist/lib-lex'));
});

gulp.task('copy-lex-lambda', function() {
	return gulp.src('lex-lambda.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('zip-lex-lambda', function() {
	return gulp.src(['dist/**', '!dist/package.json', '!dist/package-lock.json'], {nodir: true})
		.pipe(zip('dist-lex-lambda.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('upload-lex-lambda', function(callback) {
	awsLambda.deploy('./dist-lex-lambda.zip', require("./lex-lambda-config.js"), callback);
});

gulp.task('build-lex-lambda', function(callback) {
	return runSequence(
		['clean', 'clean-lex'],
		['copy-lib-shared', 'copy-data', 'copy-lib-lex', 'copy-lex-lambda'],
		['node-mods'],
		['zip-lex-lambda'],
		callback
	);
});

gulp.task('deploy-lex-lambda', function(callback) {
	return runSequence(
		['build-lex-lambda'],
		['upload-lex-lambda'],
		callback
	);
});

gulp.task('deploy', function(callback) {
	return runSequence(
		['build-lex-lambda'],
		['build-alexa-lambda'],
		['upload-lex-lambda', 'upload-alexa-lambda'],
		callback
	);
});

gulp.task('lex-lambda-apply-permissions', function() {
	let lexLambdaConfig = require('./lex-lambda-config');
	let lambda = new AWS.Lambda({region: lexLambdaConfig.region});

	console.log('Add New Permission');
	lambda.addPermission({
		Action: "lambda:invokeFunction",
		FunctionName: lexLambdaConfig.functionName,
		Principal: "lex.amazonaws.com",
		SourceArn: "arn:aws:lex:" + lexLambdaConfig.region + ":" + lexLambdaConfig.accountId + ":intent:*:*",
		StatementId: "ElectronicVeterinaryAssistant"
	}, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data);           // successful response
	});
});