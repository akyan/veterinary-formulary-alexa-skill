'use strict';

var log;
var object;

function LogHelper(log, object) {
	this.log = log;
	this.object = object;
}

LogHelper.prototype.fatal = function(method, message) {
	this.log.fatal({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.error = function(method, message) {
	this.log.error({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.warn = function(method, message) {
	this.log.warn({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.info = function(method, message) {
	this.log.info({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.debug = function(method, message) {
	this.log.debug({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.trace = function(method, message) {
	this.log.trace({
		class: this.object,
		function: method,
		message: message
	});
};

module.exports = LogHelper;