'use strict';

function DrugQueryResponder(log, drugLibrary) {
	this.log = log;
	this.drugLibrary = drugLibrary;
}

DrugQueryResponder.prototype.calculateDrugDose = function (drugName, weight) {
	this.log.info('calculateDrugDose', {drugName: drugName, weight: weight});

	var drug = this.drugLibrary.findDrugByName(drugName);

	return drug.calculateDose(weight);
};

module.exports = DrugQueryResponder;