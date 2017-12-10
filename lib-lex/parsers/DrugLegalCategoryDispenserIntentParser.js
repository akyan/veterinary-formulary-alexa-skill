'use strict';
const LexIntentParser = require('./LexIntentParser');

class DrugLegalCategoryDispenserIntentParser extends LexIntentParser {
	constructor(log, drugLegalCategoryDispenserIntentResponder) {
		super(log);

		this.log.object = 'DrugLegalCategoryDispenserIntentParser';
		this.intent = 'VeterinaryDrugLegalCategoryDispenserIntent';
		this.drugLegalCategoryDispenserIntentResponder = drugLegalCategoryDispenserIntentResponder;
	}

	respond(event, context) {
		super.respond(event, context);
		let drugLegalCategoryCode = event.currentIntent.slots.DrugLegalCategory;

		super.checkSlotAvailable("DrugLegalCategory", drugLegalCategoryCode);

		this.drugLegalCategoryDispenserIntentResponder.respond(drugLegalCategoryCode);
	};
}

module.exports = DrugLegalCategoryDispenserIntentParser;