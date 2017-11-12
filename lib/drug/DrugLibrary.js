'use strict';

function DrugLibrary(logger, data) {
	this.logger = logger;
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].name] = data[i];
	}
}

DrugLibrary.prototype.findByName = function (name) {
	this.logger.info('findByName', 'Finding drug by name: ' + name);
	var drug = this.map[name];
	if (typeof drug === "undefined") this.logger.warn('findByName', 'Failed to retrieve drug with name: ' + name);
	return drug;
};

DrugLibrary.build = function (logger, data) {
	var Drug = require('./Drug');
	var LogHelper = require('../LogHelper');
	var log = new LogHelper(logger, 'Drug');
	var drugs = [];
	for (var  i = 0, len = data.length; i < len; i++) {
		drugs.push(new Drug(log, data[i]));
	}
	return new DrugLibrary(log, drugs);
};


module.exports = DrugLibrary;