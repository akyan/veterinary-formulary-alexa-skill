'use strict';
const IntentResponder = require('./IntentResponder');

class DrugLegalCategoryDispenserIntentResponder extends IntentResponder {
	constructor(log, drugLegalCategoryLibrary) {
		super(log);

		this.log.object = 'DrugLegalCategoryDispenserIntentResponder';
		this.intent = 'VeterinaryDrugLegalCategoryDispenserIntent';
		this.drugLegalCategoryLibrary = drugLegalCategoryLibrary;
	}

	respond(event, context, lrh) {
		super.respond(event, context, lrh);
		let drugLegalCategoryCode = event.currentIntent.slots.DrugLegalCategory;

		super.checkSlotAvailable("DrugLegalCategory", drugLegalCategoryCode);

		let drugLegalCategory = this.drugLegalCategoryLibrary.findByCode(drugLegalCategoryCode);

		this.log.info('respond', 'Supplied response for ' + this.intent + ' with drug legal category ' + drugLegalCategoryCode);
		lrh.fulfill(drugLegalCategoryCode + ' can be dispensed by a ' + drugLegalCategory.dispensers + '.');
	};
}

module.exports = DrugLegalCategoryDispenserIntentResponder;