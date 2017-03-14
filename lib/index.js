'use strict';

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
		let encodedLabel = encodeURIComponent(labelXml),
				requestPayload = {
					labelXml: encodedLabel,
					printerName,
					foo1,
					foo2
				};

		return fetch(this.apiUrl,
			{ 
				method: 'POST',
				body: JSON.stringify(requestPayload),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			});
	}
}