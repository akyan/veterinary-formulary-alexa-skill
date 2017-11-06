var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));


var DrugLibrary = require('../../lib/DrugLibrary');

describe('DrugLibrary', function() {
	var subject;
	var logger;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		logger = {};
		logger.warn = sinon.spy();
		logger.error = sinon.spy();
		logger.info = sinon.spy();
		subject = new DrugLibrary(logger, require("../../data/drugs.json"));
	});

	it('#findDrugByGtin successful', function() {

		var bup = subject.findDrugByGtin('03411112112715');
		var bupfact = {
			"gtin": "03411112112715",
			"name": "Buprenorphine",
			"doseRate": 0.2,
			"concentration": 0.3
		};

		expect(bup.name).to.equal(bupfact.name);
		expect(bup.concentration).to.equal(bupfact.concentration);
		expect(bup.doseRate).to.equal(bupfact.doseRate);
		expect(bup.gtin).to.equal(bupfact.gtin);
		expect(logger.warn).to.not.be.calledOnce;
	});

	it('#findDrugByGtin successful', function() {
		var bup = subject.findDrugByGtin('3151');

		expect(bup).to.equal(undefined);
		expect(logger.warn).to.be.calledOnce;
		expect(logger.warn).to.be.calledWith('Failed to retrieve drug with gtin 3151');
	});

	after(function () {
		nock.enableNetConnect();
	});
});