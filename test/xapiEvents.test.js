'use strict';

import {assert} from 'chai';
import xAPIEvents from '../src/xapiEvents';

let
	actor     = {mbox: 'mailto:fakestudent@mail.com'},
	authority = {}
;

describe('xapiEvents library', () => {
	it('should be defined', () => {
		assert(xAPIEvents);
	});

	it('should be able to set the default info', () => {
		xAPIEvents.init(actor, authority);

		assert.ok(xAPIEvents.baseStatement, 'it should have the "baseStatement" property defined');
		assert.ok(xAPIEvents.events, 'it should have the "events" property defined');
		assert.notOk(xAPIEvents.events.length, 'it should have the "events" array empty at the beginning');
		assert.notOk(xAPIEvents.isValidStatement(xAPIEvents.statement), 'it should build a non valid statement at the beginning');
	});

	it('should be able to add a valid event', () => {
		assert(xAPIEvents);
	});
});
