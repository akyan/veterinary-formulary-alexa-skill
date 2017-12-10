const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const IntentResponder = require('../../../lib/responders/IntentResponder');

describe('IntentResponder', function() {
	let subject;
	let log;
	let responseHandler;

	beforeEach(function () {
		log = { test: 'blah'};
		responseHandler = { test: 'blah2' };
		subject = new IntentResponder(log, responseHandler);
	});

	describe('#constructor', function() {
		it('successfully stores inputs', function() {
			expect(subject.log).to.equal(log);
			expect(subject.responseHandler).to.equal(responseHandler);
		});
	});

});