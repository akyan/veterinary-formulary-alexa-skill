var nock = require('nock');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var LexResponseResolver = require('../../lib/BotResponseResolver');

describe('LexResponseResolver', function() {
	var subject;
	var log;

	before(function () {
		nock.disableNetConnect();
	});

	beforeEach(function () {
		log = {};
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.error = sinon.spy();
		log.info = sinon.spy();
		subject = new LexResponseResolver(log);
	});

	describe('#constructor', function() {
		it('successfully stores inputs', function() {
			expect(subject.log).to.equal(log);
		});
	});

	describe('#add', function() {
		it('should add new responder successfully', function() {

			subject.add('intenttest', 'path');

			var fact = subject.responderMap['intenttest'];

			expect(fact).to.be.equal('path');
			expect(log.error).to.not.be.calledOnce;
			expect(log.info).to.be.calledWith('add', 'Added resolver for intent: ' + 'intenttest');
		});

		it('should not add new responder and error', function() {

			subject.add('intenttest', 'path');
			subject.add('intenttest', 'path2');

			var fact = subject.responderMap['intenttest'];

			expect(fact).to.be.equal('path');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('add', 'The intent intenttest has already been added to the resolver');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('add', 'Added resolver for intent: ' + 'intenttest');
		});
	});

	describe('#resolve', function() {
		it('should resolve intent responder successfully if available', function() {
			var intenttestresolver = require('../data/sampleintentresolver');
			subject.add('intenttest', '../test/data/sampleintentresolver');

			var resolver = subject.resolve('intenttest');

			expect(intenttestresolver).to.be.equal(resolver);
			expect(log.error).to.not.be.called;
			expect(log.info).to.be.calledTwice;
			expect(log.info).to.be.calledWith('add', 'Added resolver for intent: ' + 'intenttest');
			expect(log.info).to.be.calledWith('resolve', 'Found resolver for intent: intenttest');
		});

		it('should not resolve intent responder successfully if not available', function() {

			expect(subject.resolve.bind(subject, 'intenttest')).to.throw(Error, 'The intent intenttest does not have a resolver registered.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('resolve', 'The intent intenttest does not have a resolver registered.');
			expect(log.info).to.not.be.called;
		});
	});

	after(function () {
		nock.enableNetConnect();
	});
});