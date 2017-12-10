const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const path = require('path');
const fs = require('fs');
chai.use(require('sinon-chai'));

const DrugLegalCategoryAcronymIntentResponder = require('../../../lib-lex/parsers/DrugLegalCategoryAcronymIntentParser');

describe('DrugLegalCategoryAcronymIntentParser', function() {
	let subject;
	let log;
	let lrh;
	let input;

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		lrh = { };
		lrh.say = sinon.spy();
		drugLegalCategoryAcronymResponder = {};
		drugLegalCategoryAcronymResponder.respond = sinon.spy();
		subject = new DrugLegalCategoryAcronymIntentResponder(log, drugLegalCategoryAcronymResponder);
		input = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/DrugLegalCategoryAcryonmIntentExample.json'), 'utf8'));
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryAcronymResponder).to.be.equals(drugLegalCategoryAcronymResponder);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryAcronymIntentParser');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {

			subject.respond(input.event, input.context);

			expect(drugLegalCategoryAcronymResponder.respond).to.be.calledOnce;
			expect(drugLegalCategoryAcronymResponder.respond).to.be.calledWith('POM-V');
		});

		it('throw error when not receiving expected drug legal category slot', function() {
			input.event.currentIntent.name = 'VeterinaryDrugLegalCategoryAcronymIntent';
			delete input.event.currentIntent.slots.DrugLegalCategory;

			expect(subject.respond.bind(subject, input.event, input.context, lrh)).to.throw(Error, 'The slot DrugLegalCategory wasn\'t defined.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('checkSlotAvailable', 'The slot DrugLegalCategory wasn\'t defined.');
		});
	});
});