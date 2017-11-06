'use strict';

function DrugLibrary(logger, data) {

	this.logger = logger;
	this.map = {};
	for (var i = 0, len = data.length; i < len; i++) {
		this.map[data[i].gtin] = data[i];
	}
}

DrugLibrary.prototype.findDrugByGtin = function (gtin) {
	var drug = this.map[gtin];
	if (typeof drug === "undefined") this.logger.warn('Failed to retrieve drug with gtin ' + gtin);
	return drug;
};

module.exports = DrugLibrary;