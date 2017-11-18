const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));


const DrugLegalCategoryLibrary = require('../../../lib/drug/DrugLegalCategoryLibrary');
const DrugLegalCategory = require('../../../lib/drug/DrugLegalCategory');
const LogHelper = require('../../../lib/LogHelper');

describe('DrugLegalCategoryLibrary', function() {
	let subject;
	let logger;
	let dlcFact;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		logger = { log: {} };
		logger.warn = sinon.spy();
		logger.info = sinon.spy();
		logger.error = sinon.spy();

		dlcFact = new DrugLegalCategory(logger, "POM-V", "Prescription Only Medicine - Veterinarian", ["Veterinarian"]);

	});

	describe('#constructor with correct logger label', function () {
		subject = new DrugLegalCategoryLibrary({}, []);
		expect(subject.log.object).to.be.equal('DrugLegalCategoryLibrary');
	});

	describe('#findByName', function () {
		it('returns drug legal category if found in library', function() {
			subject = new DrugLegalCategoryLibrary(logger, [dlcFact]);
			let dlc = subject.findByCode('POM-V');

			expect(dlcFact.code).to.equal(dlc.code);
			expect(dlcFact.name).to.equal(dlc.name);
			expect(dlcFact.authorisedDispensers).to.deep.equal(dlc.authorisedDispensers);

			expect(logger.info).to.be.calledOnce;
			expect(logger.info).to.be.calledWith('findByCode', 'Finding drug legal category by code: ' + dlcFact.code);
			expect(logger.warn).to.not.be.calledOnce;
		});

		it('returns undefined and logs warning if not found in library', function() {
			subject = new DrugLegalCategoryLibrary(logger, [dlcFact]);

			expect(subject.findByCode.bind(subject, '3151')).to.throw('Failed to retrieve drug legal category by code: 3151');
			expect(logger.info).to.be.calledOnce;
			expect(logger.info).to.be.calledWith('findByCode', 'Finding drug legal category by code: 3151');
			expect(logger.error).to.be.calledOnce;
			expect(logger.error).to.be.calledWith('findByCode', 'Failed to retrieve drug legal category by code: 3151');

		});
	});

	describe('#build', function() {
		it('successfully adapt raw drug legal categories into objects and construct library', function() {

			let druglogger = {};
			let drugLegalCategoryLibrary = DrugLegalCategoryLibrary.build(druglogger, [{
				"code": "POM-V",
				"name": "Prescription Only Medicine - Veterinarian",
				"authorisedDispensers": ["Veterinarian"]
			}]);

			let map = {};
			map[dlcFact.code] = new DrugLegalCategory(new LogHelper({}), dlcFact.code, dlcFact.name, dlcFact.authorisedDispensers);
			expect(drugLegalCategoryLibrary.map).to.deep.eq(map);
			expect(drugLegalCategoryLibrary.log.object).to.be.equal('DrugLegalCategoryLibrary');
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});