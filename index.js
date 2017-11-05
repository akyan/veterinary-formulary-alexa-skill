/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = process.env['APP_ID'];

const handlers = {
	'LaunchRequest': function () {
		this.emit('GetFact');
	},
	'HelloWorldIntent': function () {
		this.emit('SayHello')
	},
	'SayHello': function () {
		this.response.speak('Hello World!');
		this.emit(':responseReady');
	},
	'AMAZON.HelpIntent': function () {
		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_MESSAGE');
		this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	}
};

exports.handler = function (event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.appId = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};