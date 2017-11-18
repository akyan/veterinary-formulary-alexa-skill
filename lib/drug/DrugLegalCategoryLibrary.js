'use strict';
const DrugLegalCategory = require('./DrugLegalCategory');
const LogHelper = require('../LogHelper');

function DrugLegalCategoryLibrary(logger, data) {
	this.log = logger;
	this.log.object = 'DrugLegalCategoryLibrary';
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].code] = data[i];
	}
}

DrugLegalCategoryLibrary.prototype.findByCode = function (code) {
	this.log.info('findByCode', 'Finding drug legal category by code: ' + code);
	var drug = this.map[code];
	if (typeof drug === "undefined") this.log.warn('findByCode', 'Failed to retrieve drug legal category by code: ' + code);
	return drug;
};

DrugLegalCategoryLibrary.build = function (logger, data) {
	var drugLegalCategories = [];
	for (var  i = 0, len = data.length; i < len; i++) {
		drugLegalCategories.push(new DrugLegalCategory(new LogHelper(logger), data[i].code, data[i].name, data[i].authorisedDispensers));
	}
	return new DrugLegalCategoryLibrary(new LogHelper(logger), drugLegalCategories);
};


module.exports = DrugLegalCategoryLibrary;