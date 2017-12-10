let IntentResponder = require('./IntentResponder');

class DrugLegalCategoryAcronymIntentResponder extends IntentResponder {
	constructor(log, responseHandler, drugLegalCategoryLibrary) {
		super(log, responseHandler);
		this.log.object = 'DrugLegalCategoryAcronymIntentResponder';
		this.drugLegalCategoryLibrary = drugLegalCategoryLibrary;
	}

	respond(drugLegalCategoryCode) {
		let drugLegalCategory = this.drugLegalCategoryLibrary.findByCode(drugLegalCategoryCode);

		this.log.info('respond', 'Supplied response for drug legal category ' + drugLegalCategoryCode);
		this.responseHandler.say(drugLegalCategoryCode + ' means ' + drugLegalCategory.name + '.');
	}
}

module.exports = DrugLegalCategoryAcronymIntentResponder;