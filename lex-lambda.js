'use strict';
const bunyan = require('bunyan');
const LogHelper = require('./lib/LogHelper');
const APP_ID = process.env['APP_ID'];
const LexResponseHandler = require('./lib-lex/LexResponseHelper');

const BotResponseResolver = require('./lib/BotResponseResolver');
const DrugLegalCategoryAcronymIntentParser = require('./lib-lex/parsers/DrugLegalCategoryAcronymIntentParser');
const DrugLegalCategoryDispenserIntentParser = require('./lib-lex/parsers/DrugLegalCategoryDispenserIntentParser');

const DrugLegalCategoryAcronymIntentResponder = require('./lib/responders/DrugLegalCategoryAcronymIntentResponder');
const DrugLegalCategoryDispenserIntentResponder = require('./lib/responders/DrugLegalCategoryDispenserIntentResponder');

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

		let dlcair = new DrugLegalCategoryAcronymIntentResponder(new LogHelper(logger), lexResponseHandler, drugLegalCategoryLibrary);
		let dlcdir = new DrugLegalCategoryDispenserIntentResponder(new LogHelper(logger), lexResponseHandler, drugLegalCategoryLibrary);

		let brr = new BotResponseResolver(new LogHelper(logger));
		brr.add('VeterinaryDrugLegalCategoryAcronymIntent', new DrugLegalCategoryAcronymIntentParser(new LogHelper(logger), dlcair));
		brr.add('VeterinaryDrugLegalCategoryDispenserIntent', new DrugLegalCategoryDispenserIntentParser(new LogHelper(logger), dlcdir));

		let responder = brr.resolve(event.currentIntent.name);
		responder.respond(event, context, lexResponseHandler);

	} catch (err) {
		lexResponseHandler.error('Something unexpected happened, so I am unable to answer your question.', err);
		log.error('handler', err);
	}
};