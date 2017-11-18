'use strict';

function DrugQueryResponder(log, drugLibrary) {
	this.log = log;
	this.log.object = 'DrugQueryResponder';
	this.drugLibrary = drugLibrary;
}

DrugQueryResponder.prototype.calculateDrugDose = function (drugName, weight) {
	this.log.info('calculateDrugDose', {drugName: drugName, weight: weight});

	var drug = this.drugLibrary.findDrugByName(drugName);

	if (typeof drug === 'undefined') {
		this.log.warn('calculateDrugDose', 'Failed to find drug in Library ' + drugName);
		return undefined;
	}
	else
	{
		return drug.calculateDose(weight);
	}
};

module.exports = DrugQueryResponder;