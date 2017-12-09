const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const path = require('path');
const fs = require('fs');
chai.use(require('sinon-chai'));

const DrugLegalCategoryDispenserIntentResponder = require('../../../lib-lex/responders/DrugLegalCategoryDispenserIntentResponder');
const DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');

describe('DrugLegalCategoryDispenserIntentResponder', function() {
	let subject;
	let log;
	let lrh;
	let inputPOMV;

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		lrh = { };
		lrh.fulfill = sinon.spy();
		dlcl = {};
		subject = new DrugLegalCategoryDispenserIntentResponder(log, dlcl);
		inputPOMV = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/DrugLegalCategoryDispenserIntentExample-POM-V.json'), 'utf8'));
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryLibrary).to.be.equals(dlcl);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryDispenserIntentResponder');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {

			dlcl.findByCode = sinon.stub().withArgs('POM-V').returns(new DrugLegalCategory({}, "POM-V","Prescription Only Medicine - Veterinarian",["Veterinarian"]));
			subject.respond(inputPOMV.event, inputPOMV.context, lrh);

			expect(lrh.fulfill).to.be.calledOnce;
			expect(lrh.fulfill).to.be.calledWith('POM-V can be dispensed by a Veterinarian.');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('respond', 'Supplied response for ' + inputPOMV.event.currentIntent.name + ' with drug legal category ' + inputPOMV.event.currentIntent.slots.DrugLegalCategory)
		});

		it('throw error when not receiving expected drug legal category slot', function() {
			inputPOMV.event.currentIntent.name = 'VeterinaryDrugLegalCategoryDispenserIntent';
			delete inputPOMV.event.currentIntent.slots.DrugLegalCategory;

			expect(subject.respond.bind(subject, inputPOMV.event, inputPOMV.context, lrh)).to.throw(Error, 'The slot DrugLegalCategory wasn\'t defined.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('checkSlotAvailable', 'The slot DrugLegalCategory wasn\'t defined.');
		});
	});
});