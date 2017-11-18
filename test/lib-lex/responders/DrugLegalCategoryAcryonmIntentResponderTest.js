const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const DrugLegalCategoryAcronymIntentResponder = require('../../../lib-lex/responders/DrugLegalCategoryAcronymIntentResponder');

describe('DrugLegalCategoryAcronymIntentResponder', function() {
	let subject;
	let log;
	let lrh;
	let input = require ('./data/DrugLegalCategoryAcryonmIntentExample.json');

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		lrh = { };
		lrh.fulfill = sinon.spy();
		dlcl = {};
		subject = new DrugLegalCategoryAcronymIntentResponder(log, dlcl);
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryLibrary).to.be.equals(dlcl);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryAcronymIntentResponder');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {

			dlcl.findByCode = sinon.stub().withArgs('POM-V').returns({name: 'Prescription Only Medicine - Veterinarian'});
			subject.respond(input.event, input.context, lrh);

			expect(lrh.fulfill).to.be.calledOnce;
			expect(lrh.fulfill).to.be.calledWith('POM-V means Prescription Only Medicine - Veterinarian.');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('respond', 'Supplied response for ' + input.event.currentIntent.name + ' with drug legal category ' + input.event.currentIntent.slots.DrugLegalCategory)
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