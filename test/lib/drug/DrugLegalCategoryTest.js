const nock = require('nock');
const chai = require('chai');
//var sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');

describe('DrugLegalCategory', function() {
	let subject;
	let log;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		log = {};
	});

	describe('#constructor', function() {
		it('successfully stores inputs', function() {
			const code = "TEST-Code";
			const name = "Test Name";
			const authorisedDispensers = ['Bob'];
			subject = new DrugLegalCategory(log, code, name, authorisedDispensers);

			expect(subject.code).to.equal(code);
			expect(subject.name).to.equal(name);
			expect(subject.authorisedDispensers).to.deep.equal(authorisedDispensers);
			expect(subject.log.object).to.be.equal('DrugLegalCategory');
		});
	});

	describe('dispensers', function() {
		it('successfully returns a single dispenser', function() {
			const code = "TEST-Code";
			const name = "Test Name";
			const authorisedDispensers = ['Bob'];
			subject = new DrugLegalCategory(log, code, name, authorisedDispensers);

			expect(subject.dispensers).to.be.equal('a Bob');
		});

		it('successfully returns a two dispensers will formatted', function() {
			const code = "TEST-Code";
			const name = "Test Name";
			const authorisedDispensers = ['Bob', 'Charles'];
			subject = new DrugLegalCategory(log, code, name, authorisedDispensers);

			expect(subject.dispensers).to.be.equal('Bob, or a Charles');
		});

		it('successfully returns a multiple dispensers will formatted', function() {
			const code = "TEST-Code";
			const name = "Test Name";
			const authorisedDispensers = ['Bob', 'James', 'Charles'];
			subject = new DrugLegalCategory(log, code, name, authorisedDispensers);

			expect(subject.dispensers).to.be.equal('Bob, a James, or a Charles');
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});