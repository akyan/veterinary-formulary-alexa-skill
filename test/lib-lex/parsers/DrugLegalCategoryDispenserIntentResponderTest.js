const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const path = require('path');
const fs = require('fs');
chai.use(require('sinon-chai'));

const DrugLegalCategoryDispenserIntentResponder = require('../../../lib-lex/parsers/DrugLegalCategoryDispenserIntentParser');

describe('DrugLegalCategoryDispenserIntentParser', function() {
	let subject;
	let log;
	let drugLegalCategoryDispenserResponder;
	let inputPOMV;
	let drugLegalCategoryLibrary;

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		drugLegalCategoryDispenserResponder = { };
		drugLegalCategoryDispenserResponder.respond = sinon.spy();
		subject = new DrugLegalCategoryDispenserIntentResponder(log, drugLegalCategoryDispenserResponder);
		inputPOMV = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/DrugLegalCategoryDispenserIntentExample-POM-V.json'), 'utf8'));
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryLibrary).to.be.equals(drugLegalCategoryLibrary);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryDispenserIntentParser');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {

			subject.respond(inputPOMV.event, inputPOMV.context);

			expect(drugLegalCategoryDispenserResponder.respond).to.be.calledOnce;
			expect(drugLegalCategoryDispenserResponder.respond).to.be.calledWith('POM-V');
		});

		it('throw error when not receiving expected drug legal category slot', function() {
			inputPOMV.event.currentIntent.name = 'VeterinaryDrugLegalCategoryDispenserIntent';
			delete inputPOMV.event.currentIntent.slots.DrugLegalCategory;

			expect(subject.respond.bind(subject, inputPOMV.event, inputPOMV.context, drugLegalCategoryAcronymResponder)).to.throw(Error, 'The slot DrugLegalCategory wasn\'t defined.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('checkSlotAvailable', 'The slot DrugLegalCategory wasn\'t defined.');
		});
	});
});