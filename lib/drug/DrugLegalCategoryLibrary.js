'use strict';

function DrugLegalCategoryLibrary(logger, data) {
	this.logger = logger;
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].code] = data[i];
	}
}

DrugLegalCategoryLibrary.prototype.findByCode = function (code) {
	this.logger.info('findByCode', 'Finding drug legal category by code: ' + code);
	var drug = this.map[code];
	if (typeof drug === "undefined") this.logger.warn('findByCode', 'Failed to retrieve drug legal category by code: ' + code);
	return drug;
};

DrugLegalCategoryLibrary.build = function (logger, data) {
	var DrugLegalCategory = require('./DrugLegalCategory');
	var LogHelper = require('../LogHelper');
	var log = new LogHelper(logger, 'DrugLegalCategory');
	var drugLegalCategories = [];
	for (var  i = 0, len = data.length; i < len; i++) {
		drugLegalCategories.push(new DrugLegalCategory(log, data[i].code, data[i].name, data[i].authorisedDispensers));
	}
	return new DrugLegalCategoryLibrary(log, drugLegalCategories);
};


module.exports = DrugLegalCategoryLibrary;