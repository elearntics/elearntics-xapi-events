'use strict';

import { assert } from 'chai';
import xAPIEvents from '../lib/xAPI-events';

describe('xAPI-events library', () => {
	it('should be defined', () => {
		assert(xAPIEvents);
	});

	it('should be able to set the default info', () => {
		var actor, authority;

		actor = {
			mbox: 'mailto:fakestudent@mail.com'
		};

		authority = {};

		xAPIEvents.initDefault(actor, authority);
		assert.ok(xAPIEvents.statement, 'it should have the "statement" property defined');
		assert.notOk(xAPIEvents.isValidStatement(xAPIEvents.statement), 'it should build a non valid statement at the beginning');
	});
});
