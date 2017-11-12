'use strict';
var bunyan = require('bunyan');
var LogHelper = require('./lib/LogHelper');
const APP_ID = process.env['APP_ID'];

exports.handler = function (event, context) {
	var logger = bunyan.createLogger({name: 'eva-lex-function', requestId: context.awsRequestId});
	var log = new LogHelper(logger, 'lex-lambda');

	var customLogLevel = process.env['LOG_LEVEL'];
	if (typeof customLogLevel !== 'undefined')
	{
		if (customLogLevel === 'trace' || customLogLevel === 'debug' || customLogLevel === 'info' || customLogLevel === 'warn' || customLogLevel === 'error' || customLogLevel === 'fatal')
		{
			logger.level(customLogLevel);
			log.warn('handler', 'Custom log level set to ' + customLogLevel);
		}
	}
};