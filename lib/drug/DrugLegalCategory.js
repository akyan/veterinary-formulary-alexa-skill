'use strict';

class DrugLegalCategory {
	constructor(log, code, name, authorisedDispensers) {
		this.log = log;
		this.log.object = 'DrugLegalCategory';
		this.code = code;
		this.name = name;
		this.authorisedDispensers = authorisedDispensers;
	}

	get dispensers() {
		if (this.authorisedDispensers.length === 1)
		{
			return this.authorisedDispensers[0];
		}
		else
		{
			let dispensersText = this.authorisedDispensers[0];
			for(let i = 1; i<this.authorisedDispensers.length;i++) {
				if (i===(this.authorisedDispensers.length-1))
				{
					dispensersText += ", and " + this.authorisedDispensers[i];
				}
				else
				{
					dispensersText += ", " + this.authorisedDispensers[i];
				}
			}

			return dispensersText;
		}
	}
}

module.exports = DrugLegalCategory;