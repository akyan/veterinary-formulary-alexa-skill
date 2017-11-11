'use strict';

function DrugLibrary(logger, data) {
	this.logger = logger;
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].name] = data[i];
	}
}

DrugLibrary.prototype.findDrugByName = function (name) {
	this.logger.info('findDrugByName', 'Finding drug by name: ' + name);
	var drug = this.map[name];
	if (typeof drug === "undefined") this.logger.warn('findDrugByName', 'Failed to retrieve drug with name ' + name);
	return drug;
};

DrugLibrary.build = function (log, data) {
	var Drug = require('./Drug');
	var drugs = [];
	for (var  i = 0, len = data.length; i < len; i++) {
		drugs.push(new Drug(log, data[i]));
	}
	return new DrugLibrary(log, drugs);
};


module.exports = DrugLibrary;