'use strict';

function Drug(log, drugData) {
	this.log = log;
	this.log.object = 'Drug';
	this.name = drugData.name;
	this.doseRate = drugData.doseRate;
	this.concentration = drugData.concentration;
}

Drug.prototype.calculateDose = function (weight) {

	this.log.info('calculateDose', 'Calculating dose for ' + this.name + ' for animal with weight ' + weight);

	return (weight * this.doseRate) / this.concentration;
};

module.exports = Drug;