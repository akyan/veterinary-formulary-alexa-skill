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

	after(function () {
		nock.enableNetConnect();
	});
});