'use strict';
const bunyan = require('bunyan');
const LogHelper = require('./lib/LogHelper');
const APP_ID = process.env['APP_ID'];
const LexResponseHandler = require('./lib-lex/LexResponseHelper');

exports.handler = function (event, context, callback) {
	var logger = bunyan.createLogger({name: 'eva-lex-function', requestId: context.awsRequestId});
	var log = new LogHelper(logger, 'lex-lambda');
	var lrh = new LexResponseHandler(new LogHelper(logger, 'LexResponseHandler'), event.sessionAttributes, callback);

	var customLogLevel = process.env['LOG_LEVEL'];
	if (typeof customLogLevel !== 'undefined')
	{
		if (customLogLevel === 'trace' || customLogLevel === 'debug' || customLogLevel === 'info' || customLogLevel === 'warn' || customLogLevel === 'error' || customLogLevel === 'fatal')
		{
			logger.level(customLogLevel);
			log.warn('handler', 'Custom log level set to ' + customLogLevel);
		}
	}

	log.info('handler', {event: event, context: context});
	try {

		lrh.fulfill('Hello, I\'m Eva, your electronic veterinary assistant.');

	} catch (err) {
		lrh.fail('Something unexpected happened, so I can\t help your right now.');
		log.error('handler', err);
	}
};