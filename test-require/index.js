'use strict';

const Jsdom = require('jsdom').JSDOM;
const Tweakpane = require('tweakpane');

const PARAMS = {
	foo: 1,
};
const pane = new Tweakpane({
	document: (new Jsdom('')).window.document,
});
pane.addInput(PARAMS, 'foo', {
	max: 1,
	min: 0,
	step: 1,
});
console.log(pane);
