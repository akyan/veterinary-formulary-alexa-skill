var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));


var DrugLibrary = require('../../../lib/drug/DrugLibrary');
var Drug = require('../../../lib/drug/Drug');
var LogHelper = require('../../../lib/LogHelper');

describe('DrugLibrary', function() {
	var subject;
	var logger = {};
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

	describe('#constructor with correct logger label', function () {
		subject = new DrugLibrary({}, []);
		expect(subject.log.object).to.be.equal('DrugLibrary');
	});

	describe('#findByName', function() {
		it('returns drug if found in library', function() {
			subject = new DrugLibrary(libraryLogger, [new Drug(logger, bupfact)]);
			var bup = subject.findByName('Buprenorphine');

			expect(bup.name).to.equal(bupfact.name);
			expect(bup.concentration).to.equal(bupfact.concentration);
			expect(bup.doseRate).to.equal(bupfact.doseRate);
			expect(bup.gtin).to.equal(bupfact.gtin);
			expect(libraryLogger.info).to.be.calledOnce;
			expect(libraryLogger.info).to.be.calledWith('findByName', 'Finding drug by name: ' + bupfact.name);
			expect(libraryLogger.warn).to.not.be.calledOnce;
		});

		it('returns undefined and logs warning if not found in library', function() {
			subject = new DrugLibrary(libraryLogger, [new Drug(logger, bupfact)]);
			var bup = subject.findByName('3151');

			expect(bup).to.equal(undefined);
			expect(libraryLogger.info).to.be.calledOnce;
			expect(libraryLogger.info).to.be.calledWith('findByName', 'Finding drug by name: 3151');
			expect(libraryLogger.warn).to.be.calledOnce;
			expect(libraryLogger.warn).to.be.calledWith('findByName', 'Failed to retrieve drug with name: 3151');

		});

	});

	describe('#build', function() {
		it('successfully adapt raw drugs into drug objects and construct library', function() {

			var logger = {};
			var drugLibrary = DrugLibrary.build(logger, [bupfact]);
			var map = {};
			map[bupfact.name] = new Drug(new LogHelper({}), bupfact);
			expect(drugLibrary.map).to.deep.eq(map);
			expect(drugLibrary.log.object).to.be.equal('DrugLibrary');
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});