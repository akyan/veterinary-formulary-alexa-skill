var nock = require('nock');
//var chai = require('chai');
//var expect = chai.expect;

//var VetFormulary = require('../alexa-skill');

describe('vet-formulary', function() {
	//var subject = VetFormulary;

	before(function () {
		nock.disableNetConnect();
	});

	describe('handler', function() {

	});

	after(function () {
		nock.enableNetConnect();
	});
});