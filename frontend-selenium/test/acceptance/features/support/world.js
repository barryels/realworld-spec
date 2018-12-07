'use strict';


var packageJSON = require('./../../../../package.json');
var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode, } = require('cucumber');


function getWorld(config) {
	console.log('\r\n');

	switch (config.driver) {
		case 'phantomjs':
			console.log('World is using phantomjs driver...');
			require('phantomjs-prebuilt');

			this.driver = new seleniumWebdriver
				.Builder()
				.usingServer('http://localhost:' + packageJSON.config.webdrivers.phantomjs.port)
				.forBrowser('phantomjs-prebuilt')
				.build();
			break;
		default:
			console.log('World is using chrome driver...');
			require('chromedriver');

			this.driver = new seleniumWebdriver
				.Builder()
				.forBrowser('chrome')
				.build();
			break;
	}
}


defineSupportCode(function ({ setWorldConstructor, }) {
	var argv = require('minimist')(process.argv.slice(2));
	var configData = null;

	if (argv['config_path']) {
		configData = argv['config_path']
			.split('.')
			.reduce(function (obj, i) {
				return obj[i];
			}, packageJSON);
	}

	console.log('Cucumber World -> configData', configData);

	setWorldConstructor(getWorld.bind(this, configData));
});
