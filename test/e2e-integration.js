var nock = require('nock');
var chai = require('chai');
//var expect = chai.expect;

//var VetFormulary = require('../alexa-skill');

describe('vet-formulary', function() {
	//var subject = VetFormulary;

	before(function () {
		nock.disableNetConnect();
	});

	// it('handler', function() {
	// 	var event = require('./data/invocations/sayhello.json');
	// 	VetFormulary.handler(event);
	// });

	after(function () {
		nock.enableNetConnect();
	});
});