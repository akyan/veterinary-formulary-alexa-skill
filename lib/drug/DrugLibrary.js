'use strict';
const Drug = require('./Drug');
const LogHelper = require('../LogHelper');

function DrugLibrary(logger, data) {
	this.log = logger;
	this.log.object = 'DrugLibrary';
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].name] = data[i];
	}
}

DrugLibrary.prototype.findByName = function (name) {
	this.log.info('findByName', 'Finding drug by name: ' + name);
	var drug = this.map[name];
	if (typeof drug === "undefined") this.log.warn('findByName', 'Failed to retrieve drug with name: ' + name);
	return drug;
};

DrugLibrary.build = function (logger, data) {
	var drugs = [];
	for (var  i = 0, len = data.length; i < len; i++) {
		drugs.push(new Drug(new LogHelper(logger), data[i]));
	}
	return new DrugLibrary(new LogHelper(logger), drugs);
};


module.exports = DrugLibrary;