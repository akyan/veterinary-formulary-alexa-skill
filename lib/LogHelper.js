'use strict';

function LogHelper(logger, object) {
	this.logger = logger;
	this.object = 'Undefined';

	if (typeof object !== undefined)
		this.object = object;
}

LogHelper.prototype.fatal = function(method, message) {
	this.logger.fatal({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.error = function(method, message) {
	this.logger.error({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.warn = function(method, message) {
	this.logger.warn({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.info = function(method, message) {
	this.logger.info({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.debug = function(method, message) {
	this.logger.debug({
		class: this.object,
		function: method,
		message: message
	});
};

LogHelper.prototype.trace = function(method, message) {
	this.logger.trace({
		class: this.object,
		function: method,
		message: message
	});
};

module.exports = LogHelper;