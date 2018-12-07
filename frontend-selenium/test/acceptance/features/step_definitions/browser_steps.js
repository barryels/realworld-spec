'use strict';

var packageJSON = require('./../../../../package.json');
var fixtures = require('./../../../fixtures/fixtures.js');
var { seleniumWebdriver, By, until, } = require('selenium-webdriver');
var { defineSupportCode, } = require('cucumber');


var argv = require('minimist')(process.argv.slice(2));
var data = {
	config: {},
};


if (argv['config_path']) {
	data.config = argv['config_path']
		.split('.')
		.reduce(function (obj, i) {
			return obj[i];
		}, packageJSON);
}


function _findButtonByTextContent(context, text) {
	var xpath = "//button[contains(.,'" + text + "')]";
	var condition = until.elementLocated({ xpath: xpath, });
	return context.driver.wait(condition, 5000);
}


function _waitForTimeInSeconds(time, callback) {
	setTimeout(function () {
		callback();
	}, time * 1000);
}


function _findElementByXpath(xpath) {
	var condition = until.elementLocated({ xpath: xpath, });
	return this.driver.wait(condition, 5000);
}


function I_see_the_text_X(text) {
	var condition = until.elementLocated({ xpath: "//*[contains(.,'" + text + "')]", });
	return this.driver.wait(condition, 5000);
};


function I_wait_for_X_seconds(time, callback) {
	_waitForTimeInSeconds(time, callback);
}


function I_am_on_the_X_screen(screenName) {
	var _this = this;

	return new Promise(function (fulfill, reject) {
		switch (screenName) {
			case 'HOME':
				_this.driver.get(data.config.url + '/').then(fulfill);
				break;
			case 'LOGIN':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/login').then(fulfill);
				break;
			case 'REGISTER':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/register').then(fulfill);
				break;
			case 'ARTICLE_1':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/article/1').then(fulfill);
				break;
			case 'SETTINGS':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/settings').then(fulfill);
				break;
			case 'USER_TODO':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/@TODO').then(fulfill);
				break;
			case 'USER_TODO_FAVORITES':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/@TODO/favorites').then(fulfill);
				break;
			case 'NEW_ARTICLE':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/EDITOR').then(fulfill);
				break;
			case 'EDIT_ARTICLE_TODO':
				_this.driver.get(data.config.url + '/' + data.config.routerPrefix + '/EDITOR/TODO').then(fulfill);
				break;
			default:
				reject('No screen found for "' + screenName + '"');
				break;
		}
	});

	/*
	this.driver.getCurrentUrl()
		.then(function (url) {
			var currentRoutePath = url.split(data.config.routerPrefix)[1];

			switch (routeName.toLowerCase()) {
				case 'home':
					currentRoutePath === '/' ? callback() : callback('Not found');
					break;
				case 'register':
					currentRoutePath === '/client-registration' ? callback() : callback('Not found');
					break;
				case 'clienthome':
					currentRoutePath === '/client-home' ? callback() : callback('Not found');
					break;
			}

			callback('The route name provided "' + routeName + '" hasn\'t been defined in the `browser_steps.js` file.');
		});
	*/
}


function I_should_see_the_X_form(formName) {
	return new Promise(function (fulfill, reject) {
		switch (formName) {
			case 'LOGIN':
				_findElementByXpath.call(this, "//button[contains(.,'Sign in')]")
					.then(function () {
						return I_see_input_with_X_placeholder.call(this, 'Email');
					}.bind(this))
					.then(function () {
						return I_see_input_with_X_placeholder.call(this, 'Password');
					}.bind(this))
					.then(fulfill)
					.catch(reject);
				break;
			case 'REGISTER':
				_findElementByXpath.call(this, "//button[contains(.,'Sign up')]")
					.then(function () {
						return I_see_input_with_X_placeholder.call(this, 'Username');
					}.bind(this))
					.then(function () {
						return I_see_input_with_X_placeholder.call(this, 'Email');
					}.bind(this))
					.then(function () {
						return I_see_input_with_X_placeholder.call(this, 'Password');
					}.bind(this))
					.then(fulfill)
					.catch(reject);
				break;
			default:
				reject('No screen found for "' + screenName + '"');
				break;
		}
	}.bind(this));
}


function I_see_the_Header_Navigation() {
	return new Promise(function (fulfill, reject) {
		fulfill();
	});
}


function I_click_the_X_link(text) {
	return this.driver.findElement({ linkText: text, })
		.then(function (element) {
			return element.click();
		});
}


function I_click_the_X_button(text) {
	var condition = until.elementLocated({ xpath: "//button[contains(.,'" + text + "')]", });
	return this.driver.wait(condition, 5000)
		.then(function (element) {
			return element.click();
		});
}


function I_see_input_with_X_placeholder(text) {
	return new Promise(function (fulfill, reject) {
		_findElementByXpath.call(this, "//input[@placeholder='" + text + "']")
			.then(fulfill)
			.catch(reject);
	}.bind(this));
}


function I_see_textarea_with_X_placeholder(text) {
	return new Promise(function (fulfill, reject) {
		_findElementByXpath.call(this, "//textarea[@placeholder='" + text + "']")
			.then(fulfill)
			.catch(reject);
	}.bind(this));
}


function I_am_logged_in_as_X(text) {
	return new Promise(function (fulfill, reject) {
		switch (text) {
			case 'USER_1':
				console.log(fixtures.users.USER_1);

				// Do some stuff, then...
				fulfill();
				break;
			default:
				reject('No user details found in fixtures.js for "' + text + '"');
				break;
		}
	}.bind(this));
}


function I_type_X_into_the_Y_input() {

}


defineSupportCode(function ({ setDefaultTimeout, Given, When, Then, }) {

	setDefaultTimeout(10 * 1000);


	Given('I am on the {word} screen', I_am_on_the_X_screen);
	Given('I wait for {float} seconds', I_wait_for_X_seconds);
	Given('I wait for {int} seconds', I_wait_for_X_seconds);
	Given('I click the {string} link', I_click_the_X_link);
	Given('I click the {string} button', I_click_the_X_button);
	Given('I am logged in as {word}', I_am_logged_in_as_X);



	// <Whens>

	When('I type {string} into the {string} input', function (text, fieldName) {
		return I_see_input_with_X_placeholder.call(this, fieldName)
			.then(function (element) {
				return element.sendKeys(text);
			});
	});


	When('I clear the {string} input', function (fieldName) {
		return this.driver.findElement(By.name(fieldName))
			.then(function (element) {
				return element.clear();
			});
	});


	// When('I click the {string} button', I_click_the_X_button);


	When('I click the Main Menu trigger', function (callback) {
		this.driver.findElement(By.className('_main-menu-trigger_'))
			.then(function (element) {
				element.click()
					.then(function () {
						setTimeout(function () {
							callback();
						}, 500);
					});
			});
	});

	// </Whens>


	// <Thens>

	Then('I should be on the {word} screen', I_am_on_the_X_screen);
	Then('I should see the Header Navigation', I_see_the_Header_Navigation);
	Then('I should see the {word} form', I_should_see_the_X_form);
	Then('I should see the input with placeholder {string}', I_see_input_with_X_placeholder);
	Then('I should see the textarea with placeholder {string}', I_see_textarea_with_X_placeholder);
	Then('I should see the text {string}', I_see_the_text_X);


	Then('I should see the primary title {string}', function (text) {
		var xpath = "//h1[contains(.,'" + text + "')]";
		var condition = until.elementLocated({ xpath: xpath, });
		return this.driver.wait(condition, 5000);
	});


	Then('I should see the paragraph {string}', function (text) {
		var xpath = "//p[contains(.,'" + text + "')]";
		var condition = until.elementLocated({ xpath: xpath, });
		return this.driver.wait(condition, 5000);
	});


	Then('I should see a ProgressIndicator', function () {
		return this.driver.findElement({ className: 'ProgressIndicator', });
	});


	Then('I should see the link {string}', function (text) {
		return this.driver.findElement({ linkText: text, });
	});


	Then('I should see the {string} component', function (className) {
		return this.driver.findElement(By.className(className))
	});


	Then('I should see element with class {string}', function (className) {
		return this.driver.findElement(By.className(className));
	});


	Then('I should see the {string} button', function (text) {
		return _findButtonByTextContent(this, text);
	});


	Then('The {string} button should be disabled', function (text) {
		return _findButtonByTextContent(this, text)
			.then(function (element) {
				return element.getAttribute('disabled');
			});
	});


	Then('The {string} button should be enabled', function (text, callback) {
		_findButtonByTextContent(this, text)
			.then(function (element) {
				element.getAttribute('disabled')
					.then(function (attribute) {
						if (attribute) {
							callback('Button has a "disabled" attribute');
						}
						callback();
					});
			});
	});


	// </Thens>

});
