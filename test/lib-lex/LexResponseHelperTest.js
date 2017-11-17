var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var LexResponseHelper = require('../../lib-lex/LexResponseHelper');

describe('LexResponseHelper', function() {
	var subject;
	var log;
	var callback;
	var sessionAttributes;

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
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(subject.callback).to.equal(callback);
			expect(log.warn).to.not.be.called;
			expect(log.trace).to.not.be.called;
		});
	});

	describe('#fail', function() {
		it('should send closure request with exception', function() {
			sessionAttributes = "TestAttributes";
			var message = 'blah';
			var exception = {
				error: 'blah'
			};
			subject = new LexResponseHelper(log, sessionAttributes, callback);

			var response = {
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

			subject.fail(message, exception);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.warn).to.be.calledOnce;
			expect(log.warn).to.be.calledWith('fail', {message: message, exception: exception});
			expect(log.trace).to.be.calledOnce;
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(exception, response);
		});

		it('should send closure request without exception', function() {
			sessionAttributes = "TestAttributes";
			var message = 'blah';
			var exception = undefined;
			subject = new LexResponseHelper(log, sessionAttributes, callback);

			var response = {
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

			subject.fail(message);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.warn).to.be.calledOnce;
			expect(log.trace).to.be.calledOnce;
			expect(log.warn).to.be.calledWith('fail', {message: message, exception: exception});
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(null, response);
		});

	});

	describe('#fulfill', function() {
		it('should send closure request with fulfill status', function() {
			sessionAttributes = "TestAttributes";
			var message = 'blah';

			subject = new LexResponseHelper(log, sessionAttributes, callback);

			var response = {
				sessionAttributes: sessionAttributes,
				dialogAction: {
					"type": "Close",
					"fulfillmentState": "Fulfilled",
					"message": {
						"contentType": "PlainText or SSML",
						"content": message
					}
				}
			};

			subject.fulfill(message);
			expect(subject.log).to.equal(log);
			expect(subject.sessionAttributes).to.equal(sessionAttributes);
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('fulfill', {message: message});
			expect(log.trace).to.be.calledOnce;
			expect(callback).to.be.calledOnce;
			expect(callback).to.be.calledWith(null, response);
		});

	});

	after(function () {
		nock.enableNetConnect();
	});
});