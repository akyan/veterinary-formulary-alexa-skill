const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const DrugLegalCategoryAcronymIntentResponder = require('../../../lib/responders/DrugLegalCategoryAcronymIntentResponder');

describe('DrugLegalCategoryAcronymIntentResponder', function() {
	let subject;
	let log;
	let dlcl;
	let rh;

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		rh = {};
		rh.say = sinon.spy();
		dlcl = {};
		subject = new DrugLegalCategoryAcronymIntentResponder(log, rh, dlcl);
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryLibrary).to.be.equals(dlcl);
			expect(subject.responseHandler).to.be.equals(rh);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryAcronymIntentResponder');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {
			let dlc = 'POM-V';
			dlcl.findByCode = sinon.stub().withArgs(dlc).returns({name: 'Prescription Only Medicine - Veterinarian'});
			subject.respond(dlc);

			expect(rh.say).to.be.calledOnce;
			expect(rh.say).to.be.calledWith(dlc + ' means Prescription Only Medicine - Veterinarian.');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('respond', 'Supplied response for drug legal category ' + dlc)
		});
	});
});