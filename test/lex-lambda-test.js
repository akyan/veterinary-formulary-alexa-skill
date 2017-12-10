const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));
const path = require('path');
const fs = require('fs');

let lexLambda = require('../lex-lambda');

describe('lex-lambda', function() {
	let input;
	let event;
	let context;
	let callback;

	beforeEach(function () {
		callback = sinon.spy();
	});

	describe('handler', function() {
		it('successfully responds for VeterinaryDrugLegalCategoryAcronymIntent', function() {
			input = JSON.parse(fs.readFileSync(path.join(__dirname + '/lib-lex/parsers/data/DrugLegalCategoryAcryonmIntentExample.json'), 'utf8'));
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

		it('successfully responds for VeterinaryDrugLegalCategoryDispenserIntent', function() {
			input = JSON.parse(fs.readFileSync(path.join(__dirname + '/lib-lex/parsers/data/DrugLegalCategoryDispenserIntentExample-POM-V.json'), 'utf8'));
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
						"content": "POM-V can be dispensed by a Veterinarian."
					}
				}
			})
		});

		it('successfully responds to invalid intent', function() {
			input = JSON.parse(fs.readFileSync(path.join(__dirname + '/lib-lex/parsers/data/DrugLegalCategoryAcryonmIntentExample.json'), 'utf8'));
			event = input.event;
			context = input.context;
			event.currentIntent.name = 'test';

			lexLambda.handler(event, context, callback);

			expect(callback).to.be.calledOnce;
			expect(callback.args[0][0].message).to.be.equal('The intent test does not have a resolver registered.');
			expect(callback.args[0][1]).to.be.deep.equal({
				"sessionAttributes": {},
				"dialogAction": {
					"type": "Close",
					"fulfillmentState": "Failed",
					"message": {
						"contentType": "PlainText",
						"content": "Something unexpected happened, so I am unable to answer your question."
					}
				}
			})
		});
	});

});