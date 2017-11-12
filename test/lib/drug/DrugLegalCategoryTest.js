var nock = require('nock');
var chai = require('chai');
//var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');

describe('DrugLegalCategory', function() {
	var subject;
	var log;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		log = {};
	});

	describe('#constructor', function() {
		it('successfully stores inputs', function() {
			var code = "TEST-Code";
			var name = "Test Name";
			var authorisedDispensers = ['Bob'];
			subject = new DrugLegalCategory(log, code, name, authorisedDispensers);

			expect(subject.code).to.equal(code);
			expect(subject.name).to.equal(name);
			expect(subject.authorisedDispensers).to.deep.equal(authorisedDispensers);
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});