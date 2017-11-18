const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

let lexLambda = require('../lex-lambda');

describe('lex-lambda', function() {
	describe('handler', function() {
		it('successfully responds for VeterinaryDrugLegalCategoryAcronymIntent', function() {
			let input = require('./lib-lex/responders/data/DrugLegalCategoryAcryonmIntentExample.json');
			let event = input.event;
			let context = input.context;
			let callback = sinon.spy();

			lexLambda.handler(event, context, callback);

			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(null, {
				"sessionAttributes": {},
				"dialogAction": {
					"type": "Close",
					"fulfillmentState": "Fulfilled",
					"message": {
						"contentType": "PlainText",
						"content": "POM-V means Prescription Only Medicine - Veterinarian."
					}
				}
			})
		});
	});

});