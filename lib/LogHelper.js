'use strict';

class LogHelper {
	constructor(logger, object) {
		this.logger = logger;
		this.object = 'Undefined';

		if (typeof object !== "undefined")
			this.object = object;
	}

	fatal(method, message) {
		this.logger.fatal({
			class: this.object,
			function: method,
			message: message
		});
	}

	error(method, message) {
		this.logger.error({
			class: this.object,
			function: method,
			message: message
		});
	}

	warn(method, message) {
		this.logger.warn({
			class: this.object,
			function: method,
			message: message
		});
	}

	info(method, message) {
		this.logger.info({
			class: this.object,
			function: method,
			message: message
		});
	}

	debug(method, message) {
		this.logger.debug({
			class: this.object,
			function: method,
			message: message
		});
	}

	trace(method, message) {
		this.logger.trace({
			class: this.object,
			function: method,
			message: message
		});
	};
}

module.exports = LogHelper;