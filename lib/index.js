'use strict';

let fetcher;

if (typeof fetch === 'undefined') {
	fetcher = require('node-fetch');
} else {
	fetcher = fetch;
}

class Dymo {
	constructor(options) {
		options = options || {};

		this.hostname = options.hostname || '127.0.0.1';
		this.port = options.port || 41951;
		this.printerName = options.printerName;
	}

	get apiUrl() {
		return `https://${this.hostname}:${this.port}/DYMO/DLS/Printing`;
	} 

	print(printerName, labelXml, labelSetXml='') {
		let label = `printerName=${encodeURIComponent(printerName)}&printParamsXml=&labelXml=${encodeURIComponent(labelXml)}&labelSetXml=${encodeURIComponent(labelSetXml)}`;
        
		if (typeof process !== 'undefined' && process.env) {
    	    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // TODO: Bundle the certificates.
        }

        return fetcher(`${this.apiUrl}/PrintLabel`, { 
            method: 'POST',
            body: label,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.text())
            .then(result => result);
    
    }

	renderLabel(labelXml) {
		let label = `printerName=&renderParamsXml=&labelXml=${encodeURIComponent(labelXml)}&labelSetXml=`;

                if (typeof process !== 'undefined' && process.env) {
                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // TODO: Bundle the certificates.
                }

                return fetcher(`${this.apiUrl}/RenderLabel`,
			{ 
                                method: 'POST',
                                body: label,
                                headers: {
                                	'Content-Type': 'application/x-www-form-urlencoded'
				}
                        }).then((response) => response.text());
	}

	getStatus() {
		if (typeof process !== 'undefined' && process.env) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // TODO: Bundle the certificates.
                }

                return fetcher(`${this.apiUrl}/StatusConnected`)
                        .then((response) => response.text());
	}

	getPrinters() {
		if (typeof process !== 'undefined' && process.env) {
    	    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // TODO: Bundle the certificates.
		}
				
        return fetcher(`${this.apiUrl}/GetPrinters`)
            .then((response) => response.text());
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Dymo;
} else {
	window.Dymo = Dymo;
}
