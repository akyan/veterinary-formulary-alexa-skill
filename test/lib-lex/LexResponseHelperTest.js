const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const LexResponseHelper = require('../../lib-lex/LexResponseHelper');

describe('LexResponseHelper', function() {
	let subject;
	let log;
	let callback;
	let sessionAttributes;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		log = {};
		sessionAttributes = "TestAttributes";
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info = sinon.spy();
		callback = sinon.spy();
	});

	describe('#constructor', function() {
		it('successfully stores inputs', function() {
			callback = 'blah';
			subject = new LexResponseHelper(log, sessionAttributes, callback);

			expect(subject.log).to.equal(log);
			expect(subject.log.object).to.be.equal('LexResponseHelper');
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(subject.callback).to.equal(callback);
			expect(log.warn).to.not.be.called;
			expect(log.trace).to.not.be.called;
		});
	});

	describe('#error', function() {
		it('should send closure request with exception', function() {
			sessionAttributes = "TestAttributes";
			const message = 'blah';
			const exception = {
				error: 'blah'
			};
			subject = new LexResponseHelper(log, sessionAttributes, callback);

			const response = {
				sessionAttributes: sessionAttributes,
				dialogAction: {
					"type": "Close",
					"fulfillmentState": "Failed",
					"message": {
						"contentType": "PlainText",
						"content": message
					}
				}
			};

			subject.error(message, exception);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.warn).to.be.calledOnce;
			expect(log.warn).to.be.calledWith('error', {message: message, exception: exception});
			expect(log.trace).to.be.calledOnce;
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(exception, response);
		});

		it('should send closure request without exception', function() {
			sessionAttributes = "TestAttributes";
			const message = 'blah';
			const exception = undefined;
			subject = new LexResponseHelper(log, sessionAttributes, callback);

			const response = {
				sessionAttributes: sessionAttributes,
				dialogAction: {
					"type": "Close",
					"fulfillmentState": "Failed",
					"message": {
						"contentType": "PlainText",
						"content": message
					}
				}
			};

			subject.error(message);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.warn).to.be.calledOnce;
			expect(log.trace).to.be.calledOnce;
			expect(log.warn).to.be.calledWith('error', {message: message, exception: exception});
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(null, response);
		});

	});

	describe('#say', function() {
		it('should send closure request with say status', function() {
			sessionAttributes = "TestAttributes";
			const message = 'blah';

			subject = new LexResponseHelper(log, sessionAttributes, callback);

			const response = {
				sessionAttributes: sessionAttributes,
				dialogAction: {
					"type": "Close",
					"fulfillmentState": "Fulfilled",
					"message": {
						"contentType": "PlainText",
						"content": message
					}
				}
			};

			subject.say(message);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('say', {message: message});
			expect(log.trace).to.be.calledOnce;
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(null, response);
		});

	});

	after(function () {
		nock.enableNetConnect();
	});
});