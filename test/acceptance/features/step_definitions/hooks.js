var { defineSupportCode, } = require('cucumber');
var fixtures = require('./../../../fixtures/fixtures.js');


console.log('VVVVV fixtures VVVVV');
console.log(fixtures);
console.log('^^^^^ fixtures ^^^^^');


function getFixtureValueFromDotNotationVariableName(variableName) {
	let source = {};

	function index(obj, i) {
		return obj[i];
	}

	if (variableName.indexOf('fixtures.') > -1) {
		variableName = variableName.split('fixtures.')[1];
		source = fixtures;
	}

	return variableName.split('.').reduce(index, source);
}


function getFixtureValueFromText(text) {
	return text.replace(/\$\{(.+)\}/g, function (match, expr) {
		return getFixtureValueFromDotNotationVariableName(expr);
	});
}


defineSupportCode(function ({ Before, After, }) {
	Before(function (testCase, callback) {
		console.log('<BeforeHook>');
		console.log('STEPS BEFORE:');
		console.log(JSON.stringify(testCase.pickle.steps));

		testCase.pickle.steps.map(function (step) {
			if (step.text.indexOf('${fixtures.') > -1) {
				step.text = getFixtureValueFromText(step.text);
			}
			return step;
		});

		console.log('STEPS AFTER:');
		console.log(JSON.stringify(testCase.pickle.steps));

		console.log('</BeforeHook>');

		callback();
	});

	After(function () {
		return this.driver.quit();
	});
});
