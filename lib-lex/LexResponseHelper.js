'use strict';
class LexResponseHelper {
	constructor(log, sessionAttributes, callback) {
		this.log = log;
		this.log.object = 'LexResponseHelper';
		this.sessionAttributes = sessionAttributes;
		this.callback = callback;
	}

	fail(message, exception) {
		this.log.warn('fail', {message: message, exception: exception});

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

		this.log.trace('fail', {response: response});

		if (typeof exception === 'undefined')
		{
			exception = null;
		}

		this.callback(exception, response);
	}

	fulfill(message) {
		this.log.info('fulfill', {message: message});

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

		this.log.trace('fulfill', {response: response});

		this.callback(null, response);
	};
}

module.exports = LexResponseHelper;