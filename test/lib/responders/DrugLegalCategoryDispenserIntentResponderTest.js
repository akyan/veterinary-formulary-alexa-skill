const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const DrugLegalCategoryDispenserIntentResponder = require('../../../lib/responders/DrugLegalCategoryDispenserIntentResponder');
const DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');

describe('DrugLegalCategoryDispenserIntentResponder', function() {
	let subject;
	let log;
	let rh;
	let dlcl;

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		rh = {};
		rh.say = sinon.spy();
		dlcl = {};
		subject = new DrugLegalCategoryDispenserIntentResponder(log, rh, dlcl);
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.be.equal(log);
			expect(subject.drugLegalCategoryLibrary).to.be.equals(dlcl);
			expect(subject.responseHandler).to.be.equals(rh);
			expect(subject.log.object).to.be.equal('DrugLegalCategoryDispenserIntentResponder');
		});
	});

	describe('#respond', function() {
		it('send response when receiving a well formatted response', function() {
			let dlc = 'POM-V';
			dlcl.findByCode = sinon.stub().withArgs('POM-V').returns(new DrugLegalCategory({}, "POM-V","Prescription Only Medicine - Veterinarian",["Veterinarian"]));
			subject.respond(dlc);

			expect(dlcl.findByCode).to.be.calledOnce;
			expect(rh.say).to.be.calledOnce;
			expect(rh.say).to.be.calledWith('POM-V can be dispensed by a Veterinarian.');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('respond', 'Supplied response for drug legal category ' + dlc)
		});
	});
});