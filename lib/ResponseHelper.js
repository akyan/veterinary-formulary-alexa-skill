class ResponseHelper {
	constructor(log) {
		this.log = log;
	}

	error(message, exception) {
		this.log.warn('error', {message: message, exception: exception});
	}

	say(message) {
		this.log.info('say', {message: message});
	};
}

module.exports = ResponseHelper;