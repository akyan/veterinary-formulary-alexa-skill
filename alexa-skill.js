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
var logger = require('bunyan').createLogger({name: 'eva-skill'});
const Alexa = require('alexa-sdk');

const APP_ID = process.env['APP_ID'];

const BuiltInIntentHandler = {
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
	logger.info('Initialising Skill');
	const alexa = Alexa.handler(event, context);
	alexa.appId = APP_ID;

	logger.info('Registering Intent Handler');
	alexa.registerHandlers(BuiltInIntentHandler);

	logger.info('Executing Response');
	alexa.execute();

	logger.info('Response Sent');
};