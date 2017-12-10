const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));
const path = require('path');
const fs = require('fs');

let alexaLambda = require('../alexa-lambda');

describe('alexa-lambda', function() {
	let input;
	let event;
	let context;
	let callback;

	beforeEach(function () {
		callback = sinon.spy();
	});

	describe('handler', function() {
		it('successfully responds for VeterinaryDrugLegalCategoryAcronymIntent', function() {
			input = JSON.parse(fs.readFileSync(path.join(__dirname + '/lib-lex/responders/data/DrugLegalCategoryAcryonmIntentExample.json'), 'utf8'));
			event = input.event;
			context = input.context;

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