var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var DrugQueryResponder = require('../../../lib/drug/DrugQueryHelper');

describe('DrugQueryResponder', function() {
	var subject;
	var log;
	var drugLibrary;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		log = {};
		drugLibrary = {};

	});

	describe('#constructor', function() {
		it('sets log class successfully', function() {
			subject = new DrugQueryResponder(log, {});

			expect(subject.log).to.be.equal(log);
			expect(subject.log.object).to.be.equal('DrugQueryResponder');
		})
	});

	describe('#calculateDrugDose', function() {
		it('calculates drug dose when drug found', function() {
			log.info = sinon.spy();
			var drugName = 'blah';
			var weight = 4;
			var drugStub = {};
			drugStub.calculateDose = sinon.stub().withArgs(weight).returns(0.4);
			drugLibrary.findDrugByName = sinon.stub();
			drugLibrary.findDrugByName.withArgs(drugName).returns(drugStub);
			subject = new DrugQueryResponder(log, drugLibrary);

			var response = subject.calculateDrugDose('blah', 4);
			expect(response).to.be.equal(0.4);
			expect(drugStub.calculateDose).to.be.calledOnce;
			expect(drugLibrary.findDrugByName).to.be.calledOnce;
			expect(log.info).to.be.calledOnce;
		});

		it('returns undefined and logs warning when drug not found', function() {
			log.info = sinon.spy();
			log.warn = sinon.spy();
			var drugName = 'blah';
			drugLibrary.findDrugByName = sinon.stub();
			drugLibrary.findDrugByName.withArgs(drugName).returns(undefined);
			subject = new DrugQueryResponder(log, drugLibrary);

			var response = subject.calculateDrugDose('blah', 4);
			expect(response).to.be.equal(undefined);
			expect(drugLibrary.findDrugByName).to.be.calledOnce;
			expect(log.info).to.be.calledOnce;
			expect(log.warn).to.be.calledOnce;
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});