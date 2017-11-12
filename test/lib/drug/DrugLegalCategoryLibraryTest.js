var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));


var DrugLegalCategoryLibrary = require('../../../lib/drug/DrugLegalCategoryLibrary');
var DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');
var LogHelper = require('../../../lib/LogHelper');

describe('DrugLegalCategoryLibrary', function() {
	var subject;
	var logger;
	var dlcFact;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		libraryLogger = {};
		libraryLogger.warn = sinon.spy();
		libraryLogger.info = sinon.spy();


		dlcFact = new DrugLegalCategory(logger, "POM-V", "Prescription Only Medicine - Veterinarian", ["Veterinarian"]);

	});

	describe('#findByName', function () {
		it('returns drug legal category if found in library', function() {
			subject = new DrugLegalCategoryLibrary(libraryLogger, [dlcFact]);
			var dlc = subject.findByCode('POM-V');

			expect(dlcFact.code).to.equal(dlc.code);
			expect(dlcFact.name).to.equal(dlc.name);
			expect(dlcFact.authorisedDispensers).to.deep.equal(dlc.authorisedDispensers);

			expect(libraryLogger.info).to.be.calledOnce;
			expect(libraryLogger.info).to.be.calledWith('findByCode', 'Finding drug legal category by code: ' + dlcFact.code);
			expect(libraryLogger.warn).to.not.be.calledOnce;
		});

		it('returns undefined and logs warning if not found in library', function() {
			subject = new DrugLegalCategoryLibrary(libraryLogger, [dlcFact]);
			var dlc = subject.findByCode('3151');

			expect(dlc).to.equal(undefined);
			expect(libraryLogger.info).to.be.calledOnce;
			expect(libraryLogger.info).to.be.calledWith('findByCode', 'Finding drug legal category by code: 3151');
			expect(libraryLogger.warn).to.be.calledOnce;
			expect(libraryLogger.warn).to.be.calledWith('findByCode', 'Failed to retrieve drug legal category by code: 3151');

		});
	});

	describe('#build', function() {
		it('successfully adapt raw drug legal categories into objects and construct library', function() {

			var logger = {};
			var drugLegalCategoryLibrary = DrugLegalCategoryLibrary.build(logger, [{
				"code": "POM-V",
				"name": "Prescription Only Medicine - Veterinarian",
				"authorisedDispensers": ["Veterinarian"]
			}]);
			var map = {};
			map[dlcFact.code] = new DrugLegalCategory(new LogHelper({}, 'DrugLegalCategory'), dlcFact.code, dlcFact.name, dlcFact.authorisedDispensers);
			expect(drugLegalCategoryLibrary.map).to.deep.eq(map);
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});