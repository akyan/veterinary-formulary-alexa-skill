let IntentResponder = require('./IntentResponder');

class DrugLegalCategoryDispenserIntentResponder extends IntentResponder {
	constructor(log, responseHandler, drugLegalCategoryLibrary) {
		super(log, responseHandler);
		this.log.object = 'DrugLegalCategoryDispenserIntentResponder';
		this.drugLegalCategoryLibrary = drugLegalCategoryLibrary;
	}

	respond(drugLegalCategoryCode) {
		let drugLegalCategory = this.drugLegalCategoryLibrary.findByCode(drugLegalCategoryCode);

		this.log.info('respond', 'Supplied response for drug legal category ' + drugLegalCategoryCode);
		this.responseHandler.say(drugLegalCategoryCode + ' can be dispensed by ' + drugLegalCategory.dispensers + '.');
	}
}

module.exports = DrugLegalCategoryDispenserIntentResponder;