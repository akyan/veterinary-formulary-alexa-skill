'use strict';
const bunyan = require('bunyan');
const LogHelper = require('./lib/LogHelper');
const APP_ID = process.env['APP_ID'];
const LexResponseHandler = require('./lib-lex/LexResponseHelper');

const BotResponseResolver = require('./lib/BotResponseResolver');
const DrugLegalCategoryAcronymIntentResponder = require('./lib-lex/responders/DrugLegalCategoryAcronymIntentResponder');
const DrugLegalCategoryLibrary = require('./lib/drug/DrugLegalCategoryLibrary');

exports.handler = function (event, context, callback) {
	let logger = bunyan.createLogger({name: 'eva-lex-function', requestId: context.awsRequestId});
	let log = new LogHelper(logger, 'lex-lambda');
	let lexResponseHandler = new LexResponseHandler(new LogHelper(logger), event.sessionAttributes, callback);

	let customLogLevel = process.env['LOG_LEVEL'];
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
		let drugLegalCategoryLibrary = DrugLegalCategoryLibrary.build(new LogHelper(logger), require('./data/drugLegalCategories.json'));

		let brr = new BotResponseResolver(new LogHelper(logger));
		brr.add('VeterinaryDrugLegalCategoryAcronymIntent', new DrugLegalCategoryAcronymIntentResponder(new LogHelper(logger), drugLegalCategoryLibrary));

		let responder = brr.resolve(event.currentIntent.name);
		responder.respond(event, context, lexResponseHandler);

	} catch (err) {
		lexResponseHandler.fail('Something unexpected happened, so I can\t help your right now.');
		log.error('handler', err);
	}
};