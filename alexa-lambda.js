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
const bunyan = require('bunyan');
const LogHelper = require('./lib/LogHelper');
const Alexa = require('alexa-sdk');

const APP_ID = process.env['APP_ID'];

const BuiltInIntentHandler = function (logger) {

	const log = new LogHelper(logger, 'BuiltInIntentHandler');

	return {
	'LaunchRequest': function () {
		log.info('LaunchRequest', {event: this.event.request});

		this.emit('SayHello');
	},
	'SayHello': function () {
		log.info('SayHello', {event: this.event.request});

		this.response.speak('Hello, I am Eva, your electonic veterinary assistant!');
		this.emit(':responseReady');
	},
	'DrugDoseCalulatorIntent': function () {
		log.info('DrugDoseCalulatorIntent', {event: this.event.request});

		if (this.event.request.dialogState === "STARTED" || this.event.request.dialogState === "IN_PROGRESS"){
			log.info('DrugDoseCalulatorIntent', 'DialogIncomplete Initiating Delegate Dialog');
			this.emit(':delegate');
		} else {
			log.info('DrugDoseCalulatorIntent', 'Drug: ' + this.attribute['DRUG']);
			log.info('DrugDoseCalulatorIntent', 'Animal: ' + this.attribute['ANIMAL']);
			log.info('DrugDoseCalulatorIntent', 'Weight Integer: ' + this.attribute['WEIGHTINTEGER']);
			log.info('DrugDoseCalulatorIntent', 'Weight Decimal: ' + this.attribute['WEIGHTDECIMAL']);

			let weight = this.attribute['WEIGHTINTEGER'] + (this.attribute['WEIGHTDECIMAL'] / 10);
			log.info('DrugDoseCalulatorIntent', 'Weight: ' + weight);

			this.emit(':tell', 'The blah does for an ' + this.attributes['ANIMAL'] + 'weighing ' + weight + ' kilograms');
		}
	},
	'AMAZON.HelpIntent': function () {
		log.info('HelpIntent', {event: this.event.request});

		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_MESSAGE');
		this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
		log.info('CancelIntent', {event: this.event.request});

		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
		log.info('StopIntent', {event: this.event.request});

		this.emit(':tell', this.t('STOP_MESSAGE'));
	}}
};

exports.handler = function (event, context) {
	let logger = bunyan.createLogger({name: 'eva-alexa-function', requestId: context.awsRequestId});
	let log = new LogHelper(logger, 'alexa-lambda');

	let customLogLevel = process.env['LOG_LEVEL'];
	if (typeof customLogLevel !== 'undefined')
	{
		if (customLogLevel === 'trace' || customLogLevel === 'debug' || customLogLevel === 'info' || customLogLevel === 'warn' || customLogLevel === 'error' || customLogLevel === 'fatal')
		{
			logger.level(customLogLevel);
			log.warn('handler', 'Custom log level set to ' + customLogLevel);
		}
	}

	log.trace('handler', 'Initialising Skill');

	const alexa = Alexa.handler(event, context);
	alexa.appId = APP_ID;

	log.trace('handler', 'Registering Intent Handler');
	alexa.registerHandlers(BuiltInIntentHandler(logger));

	log.trace('handler', 'Executing Response');
	alexa.execute();

	log.trace('handler', 'Response Sent');
};