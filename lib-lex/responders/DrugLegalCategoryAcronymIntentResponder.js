'use strict';
const IntentResponder = require('./IntentResponder');

class DrugLegalCategoryAcronymIntentResponder extends IntentResponder {
	constructor(log, drugLegalCategoryLibrary) {
		super(log);

		this.log.object = 'DrugLegalCategoryAcronymIntentResponder';
		this.intent = 'VeterinaryDrugLegalCategoryAcronymIntent';
		this.drugLegalCategoryLibrary = drugLegalCategoryLibrary;
	}

	respond(event, context, lrh) {
		super.respond(event, context, lrh);
		let drugLegalCategoryCode = event.currentIntent.slots.DrugLegalCategory;

		super.checkSlotAvailable("DrugLegalCategory", drugLegalCategoryCode);

		let drugLegalCategory = this.drugLegalCategoryLibrary.findByCode(drugLegalCategoryCode);

		this.log.info('respond', 'Supplied response for ' + this.intent + ' with drug legal category ' + drugLegalCategoryCode);
		lrh.fulfill(drugLegalCategoryCode + ' means ' + drugLegalCategory.name + '.');
	};
}

module.exports = DrugLegalCategoryAcronymIntentResponder;