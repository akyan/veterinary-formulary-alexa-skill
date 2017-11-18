'use strict';

class IntentResponder {

	constructor(log) {
		this.log = log;
		this.log.object = 'IntentResponder';
		this.intent = 'Unknown';
	}

	respond(event) {

		if (event.currentIntent.name !== this.intent)
		{
			this.log.error('respond', 'The intent ' + event.currentIntent.name + ' is not able to be handled by this responder.');
			throw new Error ('The intent ' + event.currentIntent.name + ' is not able to be handled by this responder.')
		}

	};

	checkSlotAvailable(slotName, slotField) {
		if (typeof slotField === "undefined")
		{
			let err = 'The slot ' + slotName + ' wasn\'t defined.';
			this.log.error('checkSlotAvailable', err);
			throw new Error(err)
		}
	}
}

module.exports = IntentResponder;