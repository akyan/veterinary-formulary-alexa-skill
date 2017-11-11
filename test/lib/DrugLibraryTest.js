var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));


var DrugLibrary = require('../../lib/DrugLibrary');
var Drug = require('../../lib/Drug');

describe('DrugLibrary', function() {
	var subject;
	var logger;
	var bupfact;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		libraryLogger = {};
		libraryLogger.warn = sinon.spy();
		libraryLogger.info = sinon.spy();

		bupfact = {
			"name": "Buprenorphine",
			"doseRate": 0.2,
			"concentration": 0.3
		};

	});

	it('#findDrugByName successful', function() {
		subject = new DrugLibrary(libraryLogger, [new Drug(logger, bupfact)]);
		var bup = subject.findDrugByName('Buprenorphine');

		expect(bup.name).to.equal(bupfact.name);
		expect(bup.concentration).to.equal(bupfact.concentration);
		expect(bup.doseRate).to.equal(bupfact.doseRate);
		expect(bup.gtin).to.equal(bupfact.gtin);
		expect(libraryLogger.info).to.be.calledOnce;
		expect(libraryLogger.info).to.be.calledWith('findDrugByName', 'Finding drug by name: ' + bupfact.name);
		expect(libraryLogger.warn).to.not.be.calledOnce;
	});

	it('#findDrugByName unsuccessful', function() {
		subject = new DrugLibrary(libraryLogger, [new Drug(logger, bupfact)]);
		var bup = subject.findDrugByName('3151');

		expect(bup).to.equal(undefined);
		expect(libraryLogger.info).to.be.calledOnce;
		expect(libraryLogger.info).to.be.calledWith('findDrugByName', 'Finding drug by name: 3151');
		expect(libraryLogger.warn).to.be.calledOnce;
		expect(libraryLogger.warn).to.be.calledWith('findDrugByName', 'Failed to retrieve drug with name 3151');

	});

	// it('#build', function() {
	// 	var drugLibrary = DrugLibrary.build(logger, [bupfact]);
	// 	var map = {};
	// 	map[bupfact.name] = bupfact;
	// 	expect(logger, drugLibrary.map).to.equal(map);
	// });

	after(function () {
		nock.enableNetConnect();
	});
});