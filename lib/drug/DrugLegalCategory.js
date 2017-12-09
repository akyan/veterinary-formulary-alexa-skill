'use strict';

class DrugLegalCategory {
	constructor(log, code, name, authorisedDispensers) {
		this.log = log;
		this.log.object = 'DrugLegalCategory';
		this.code = code;
		this.name = name;
		this.authorisedDispensers = authorisedDispensers;
	}
}

module.exports = DrugLegalCategory;