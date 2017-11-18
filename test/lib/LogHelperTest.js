var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var LogHelper = require('../../lib/LogHelper');

describe('LogHelper', function() {
	var subject;
	var logger;
	var object = "TestClass";
	var method = "TestMethod";
	var message = {message: "blah"};

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		logger = {};
		logger.info = sinon.spy();
		logger.warn = sinon.spy();
		logger.debug = sinon.spy();
		logger.error = sinon.spy();
		logger.fatal = sinon.spy();
		logger.trace = sinon.spy();
	});

	it('#constructor with name specified', function() {
		it('successfully stores inputs', function() {
			subject = new LogHelper(logger, object);

			expect(subject.log).to.equal(logger);
			expect(subject.object).to.equal(object);
		});
	});

	it('#constructor with name not specified', function() {
		it('successfully stores inputs', function() {
			subject = new LogHelper(logger);

			expect(subject.log).to.equal(logger);
			expect(subject.object).to.equal("Undefined");
		});
	});

	it('#info', function() {
		subject = new LogHelper(logger, object);

		subject.info(method, message);
		expect(logger.info).to.be.calledOnce;
		expect(logger.info).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.trace).not.to.be.called;
		expect(logger.debug).not.to.be.called;
		expect(logger.warn).not.to.be.called;
		expect(logger.error).not.to.be.called;
		expect(logger.fatal).not.to.be.called;
	});

	it('#warn', function() {
		subject = new LogHelper(logger, object);

		subject.warn(method, message);
		expect(logger.warn).to.be.calledOnce;
		expect(logger.warn).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.trace).not.to.be.called;
		expect(logger.debug).not.to.be.called;
		expect(logger.info).not.to.be.called;
		expect(logger.error).not.to.be.called;
		expect(logger.fatal).not.to.be.called;
	});

	it('#debug', function() {
		subject = new LogHelper(logger, object);

		subject.debug(method, message);
		expect(logger.debug).to.be.calledOnce;
		expect(logger.debug).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.trace).not.to.be.called;
		expect(logger.info).not.to.be.called;
		expect(logger.warn).not.to.be.called;
		expect(logger.error).not.to.be.called;
		expect(logger.fatal).not.to.be.called;
	});

	it('#trace', function() {
		subject = new LogHelper(logger, object);

		subject.trace(method, message);
		expect(logger.trace).to.be.calledOnce;
		expect(logger.trace).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.debug).not.to.be.called;
		expect(logger.info).not.to.be.called;
		expect(logger.warn).not.to.be.called;
		expect(logger.error).not.to.be.called;
		expect(logger.fatal).not.to.be.called;
	});

	it('#error', function() {
		subject = new LogHelper(logger, object);

		subject.error(method, message);
		expect(logger.error).to.be.calledOnce;
		expect(logger.error).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.trace).not.to.be.called;
		expect(logger.debug).not.to.be.called;
		expect(logger.info).not.to.be.called;
		expect(logger.warn).not.to.be.called;
		expect(logger.fatal).not.to.be.called;
	});

	it('#fatal', function() {
		subject = new LogHelper(logger, object);

		subject.fatal(method, message);
		expect(logger.fatal).to.be.calledOnce;
		expect(logger.fatal).to.be.calledWith({class: object, function: method, message: message});

		expect(logger.trace).not.to.be.called;
		expect(logger.debug).not.to.be.called;
		expect(logger.info).not.to.be.called;
		expect(logger.warn).not.to.be.called;
		expect(logger.error).not.to.be.called;

	});

	after(function () {
		nock.enableNetConnect();
	});
});