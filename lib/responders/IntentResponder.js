'use strict';

class IntentResponder {

	constructor(log, responseHandler) {
		this.log = log;
		this.log.object = 'IntentResponder';
		this.responseHandler = responseHandler;
	}

}

module.exports = IntentResponder;