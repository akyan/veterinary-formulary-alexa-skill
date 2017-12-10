'use strict';
let ResponseHelper = require("../lib/ResponseHelper");

class LexResponseHelper extends ResponseHelper {
	constructor(log, sessionAttributes, callback) {
		super(log);
		this.log.object = 'LexResponseHelper';
		this.sessionAttributes = sessionAttributes;
		this.callback = callback;
	}

	error(message, exception) {
		super.error(message, exception);

		let response = {
			sessionAttributes: this.sessionAttributes,
			dialogAction: {
				"type": "Close",
				"fulfillmentState": "Failed",
				"message": {
					"contentType": "PlainText",
					"content": message
				}
			}
		};

		this.log.trace('error', {response: response});

		if (typeof exception === 'undefined') {
			exception = null;
		}

		this.callback(exception, response);
	}

	say(message) {
		super.say(message);

		let response = {
			sessionAttributes: this.sessionAttributes,
			dialogAction: {
				"type": "Close",
				"fulfillmentState": "Fulfilled",
				"message": {
					"contentType": "PlainText",
					"content": message
				}
			}
		};

		this.log.trace('say', {response: response});

		this.callback(null, response);
	};
}

module.exports = LexResponseHelper;