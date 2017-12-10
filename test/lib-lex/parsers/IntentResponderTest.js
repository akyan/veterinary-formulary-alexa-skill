const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const LexIntentParser = require('../../../lib-lex/parsers/LexIntentParser');

describe('LexIntentParser', function() {
	let subject;
	let lrh;
	let input = require ('./data/DrugLegalCategoryAcryonmIntentExample.json');

	beforeEach(function () {
		log = { };
		log.warn = sinon.spy();
		log.trace = sinon.spy();
		log.info =  sinon.spy();
		log.error = sinon.spy();
		lrh = { };
		lrh.fulfill = sinon.spy();
		subject = new LexIntentParser(log);
	});

	describe('#constructor', function() {
		it('successfully stores inputs and sets log object name', function() {
			expect(subject.log).to.equal(log);
			expect(subject.log.object).to.be.equal('LexIntentParser');
			expect(subject.intent).to.be.equal('Unknown');
		});
	});

	describe('#respond', function() {
		it('throw error when receiving response unexpected intent', function() {
			input.event.currentIntent.name = 'intenttest';

			expect(subject.respond.bind(subject, input.event, input.context, lrh)).to.throw(Error, 'The intent intenttest is not able to be handled by this responder.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('respond', 'The intent intenttest is not able to be handled by this responder.');
		});
	});

	describe('#checkSlotAvailable', function() {
		it('throw error when expect slot is not populated', function() {
			input.event.currentIntent.name = 'intenttest';

			expect(subject.checkSlotAvailable.bind(subject, 'testslot', undefined)).to.throw(Error, 'The slot testslot wasn\'t defined.');
			expect(log.error).to.be.calledOnce;
			expect(log.error).to.be.calledWith('checkSlotAvailable', 'The slot testslot wasn\'t defined.');
		});
	});
});