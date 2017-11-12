var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var DrugQueryResponder = require('../../../lib/drug/DrugQueryResponder');

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

	it('#calculateDrugDose', function() {
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

	after(function () {
		nock.enableNetConnect();
	});
});