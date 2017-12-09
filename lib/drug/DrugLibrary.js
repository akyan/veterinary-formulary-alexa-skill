'use strict';
const Drug = require('./Drug');
const LogHelper = require('../LogHelper');

class DrugLibrary {
	constructor(logger, data) {
		this.log = logger;
		this.log.object = 'DrugLibrary';
		this.map = {};
		for (let i = 0, len = data.length; i < len; i++) {
			this.map[data[i].name] = data[i];
		}
	}

	findByName(name) {
		this.log.info('findByName', 'Finding drug by name: ' + name);
		let drug = this.map[name];
		if (typeof drug === "undefined") this.log.warn('findByName', 'Failed to retrieve drug with name: ' + name);
		return drug;
	}

	static build(logger, data) {
		let drugs = [];
		for (let  i = 0, len = data.length; i < len; i++) {
			drugs.push(new Drug(new LogHelper(logger), data[i]));
		}
		return new DrugLibrary(new LogHelper(logger), drugs);
	}
}

module.exports = DrugLibrary;