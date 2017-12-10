'use strict';
const LexIntentParser = require('./LexIntentParser');

class DrugLegalCategoryAcronymIntentParser extends LexIntentParser {
	constructor(log, drugLegalCategoryAcronymResponder) {
		super(log);

		this.log.object = 'DrugLegalCategoryAcronymIntentParser';
		this.intent = 'VeterinaryDrugLegalCategoryAcronymIntent';
		this.drugLegalCategoryAcronymResponder = drugLegalCategoryAcronymResponder;
	}

	respond(event, context) {
		super.respond(event, context);
		let drugLegalCategoryCode = event.currentIntent.slots.DrugLegalCategory;

		super.checkSlotAvailable("DrugLegalCategory", drugLegalCategoryCode);

		this.drugLegalCategoryAcronymResponder.respond(drugLegalCategoryCode);
	};
}

module.exports = DrugLegalCategoryAcronymIntentParser;