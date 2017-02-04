'use strict';

import { assert } from 'chai';
import xapiEvents from '../src/xapiEvents';
import { EventStatus } from '../src/events/event-status';
import { xapiEvent } from '../src/events/xapi-event';

let
  actor = {
    mbox: 'mailto:fakestudent@mail.com'
  },
  authority = {};

describe('xapiEvents library', () => {
  it('should be defined', () => {
    assert(xapiEvents);
  });

  it('should be able to set the default info', () => {
    xapiEvents.init(actor, authority);

    assert.ok(xapiEvents.baseStatement, 'it should have the "baseStatement" property defined');
    assert.ok(xapiEvents.events, 'it should have the "events" property defined');
    assert.notOk(xapiEvents.events.length, 'it should have the "events" array empty at the beginning');
    assert.notOk(xapiEvents.isValidStatement(xapiEvents.statement), 'it should build a non valid statement at the beginning');
  });

  it('should be able to check if an event is invalid', () => {
    let invalidEvent;

    invalidEvent = xapiEvent;
    assert.notOk(xapiEvents.isValidEvent(invalidEvent));
  });

  it('should be able to check if an event is valid', () => {
    let invalidEvent, validEvent, callbackFunction;

    callbackFunction = () => {};
    invalidEvent = Object.assign({}, xapiEvent);
    invalidEvent.status = 'INVALID_STATUS';

    assert.notOk(xapiEvents.isValidEvent(invalidEvent), 'it should return that the event is not valid [id, status, callback]');
    assert.ok(xapiEvents.errors.length, `it should have stored the errors: ${xapiEvents.errors}`);

    invalidEvent.status = EventStatus.OFF;
    assert.notOk(xapiEvents.isValidEvent(invalidEvent), 'it should return that the event is not valid [id, callback]');
    assert.ok(xapiEvents.errors.length, `it should have stored the errors: ${xapiEvents.errors}`);

    invalidEvent = Object.assign({}, xapiEvent, { callback: callbackFunction });
    assert.notOk(xapiEvents.isValidEvent(invalidEvent), 'it should return that the event is not valid [callback]');
    assert.ok(xapiEvents.errors.length, `it should have stored the errors: ${xapiEvents.errors}`);

    invalidEvent = Object.assign({}, xapiEvent, { id: 'event-id', callback: callbackFunction });
    console.log('invalid', invalidEvent);
    assert.notOk(xapiEvents.isValidEvent(invalidEvent), 'it should return that the event is not valid');
    assert.ok(xapiEvents.errors.length, `it should have stored the errors: ${xapiEvents.errors}`);

    validEvent = Object.assign({}, xapiEvent, { id: 'event-id', name: 'click', callback: callbackFunction });
    assert.ok(xapiEvents.isValidEvent(validEvent), 'it should return that the event is valid');
    assert.notOk(xapiEvents.errors.length, `it should not have stored the errors: ${xapiEvents.errors}`);
  });
});
