'use strict';

const fetch = require('node-fetch');

class Dymo {
	constructor(options) {
		options = options || {};

		this.hostname = options.hostname || 'localhost';
		this.port = options.port || 41951;
		this.printerName = options.printerName;
	}

	get apiUrl() {
		return `https://${this.hostname}:${this.port}/DYMO/DLS/Printing`;
	} 

	print(printerName, labelXml) {
		let label = `printerName=${encodeURIComponent(printerName)}&printParamsXml=&labelXml=${encodeURIComponent(labelXml)}&labelSetXml=`;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    return fetch(`${this.apiUrl}/PrintLabel`,
			{ 
				method: 'POST',
				body: label,
				headers: {
				  'Content-Type': 'application/x-www-form-urlencoded'
        }
			})
		.then((response) => response.text())
		.then((result) => result);
	}

	getPrinters() {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
		
		return fetch(`${this.apiUrl}/GetPrinters`)
			.then((response) => response.text());
	}
}

module.exports = Dymo;