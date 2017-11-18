const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const LexResponseResolver = require('../../lib/BotResponseResolver');

describe('LexResponseResolver', function() {
	let subject;
	let log;

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
			expect(subject.log.object).to.be.equal('BotResponseResolver');
		});
	});

	describe('#add', function() {
		it('should add new responder successfully', function() {

			subject.add('intenttest', 'path');

			let fact = subject.responderMap['intenttest'];

			expect(fact).to.be.equal('path');
			expect(log.error).to.not.be.calledOnce;
			expect(log.info).to.be.calledWith('add', 'Added resolver for intent: ' + 'intenttest');
		});

		it('should not add new responder and error', function() {

			subject.add('intenttest', 'path');
			subject.add('intenttest', 'path2');

			let fact = subject.responderMap['intenttest'];

			expect(fact).to.be.equal('path');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('add', 'The intent intenttest has already been added to the resolver');
			expect(log.info).to.be.calledOnce;
			expect(log.info).to.be.calledWith('add', 'Added resolver for intent: ' + 'intenttest');
		});
	});

	describe('#resolve', function() {
		it('should resolve intent responder successfully if available', function() {
			subject.add('intenttest', 'intentresolver');

			let resolver = subject.resolve('intenttest');

			expect(resolver).to.be.equal('intentresolver');
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