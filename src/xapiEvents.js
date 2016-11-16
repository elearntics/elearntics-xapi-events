import logger from './utils/logger';

import xAPIEventStatement from './xapi/statement';
import xAPIEventStatementContext from './xapi/statement-context';

import {EventStatus} from './events/event-status';
import {xapiEventValidator} from './events/xapi-event-validator';

import xapiValidator from 'xapiValidator';

var xAPIEvents;

xAPIEvents = {
  log:           logger.log,
  baseStatement: {},
  events:        [],
  LRS:           {},

  init(actor, authority) {
    this.log('init');
    return this.setBaseStatement(actor, authority);
  },

  reset() {
   this.log('reset');
   return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
  },

  isValidStatement() {
    this.log('isValidStatement', this.baseStatement);
    return !xapiValidator.validateStatement(this.baseStatement).errors.length;
  },

  setBaseStatement(actor, authority) {
    this.log('setBaseStatement');

    return !!actor && !!authority ?
      _buildBaseStatement.call(this, actor, authority)
      : false;
  },

  setStatementConfigInfo() {
    this.log('setStatementConfigInfo');

    return this.baseStatement && this.baseStatement.config ?
      _buildBaseStatementConfig.call(this)
      : false;
  },

  addEvent(eventObj) {
    this.log('addEvent', {eventObj});
    if (this.isValidEvent(eventObj)) {
      this.events.push(eventObj);
      return true;
    }

    return false;
  },

  addEvents(events) {
    this.log('addEvents', {events});
    events.forEach((eventObj) => {
      this.addEvent(eventObj);
    });
  },

  removeEventById(eventId) {
    this.log('removeEventById', {eventId});
    this.events = this.events.filter((xapiEvent) => xapiEvent.id !== eventId);
  },

  removeEventsByElementId(elementId) {
    this.log('removeEventsByElementId', {elementId});
    this.events = this.events.filter((xapiEvent) => xapiEvent.elementId !== elementId);
  },

  enableEvent(e) {
    this.log('enableEvent', {e});
    this.events.forEach((xapiEvent) => {
      if (e.id === xapiEvent.id) {
        xapiEvent.status = EventStatus.ON;
        return;
      }
    });
  },

  enableEventById(eventId) {
    this.log('enableEventById');
    this.events.forEach((xapiEvent) => {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = EventStatus.ON;
        return;
      }
    });
  },

  enableElementsByElementId(elementId) {
    this.log('enableElementsByElementId', {elementId});
    this.events.forEach((xapiEvent) => {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = EventStatus.ON;
      }
    });
  },

  disableEvent(e) {
    this.log('disableEvent', {e});
    this.events.forEach((xapiEvent) => {
      if (e.id === xapiEvent.id) {
        xapiEvent.status = EventStatus.OFF;
        return;
      }
    });
  },

  disableEventById(eventId) {
    this.log('disableEventById', {eventId});
    this.events.forEach((xapiEvent) => {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = EventStatus.OFF;
        return;
      }
    });
  },

  disableElementsByElementId(elementId) {
    this.log('disableElementsByElementId', {elementId});
    this.events.forEach((xapiEvent) => {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = EventStatus.OFF;
      }
    });
  },

  isValidEvent(eventObj) {
    this.log('isValidEvent', {eventObj});
    return xapiEventValidator.isValidEvent(eventObj);
  }
};

export default xAPIEvents;


/* Private */

function _buildBaseStatement(actor, authority) {
  var context;
  this.log('_buildBaseStatement', {actor, authority});

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, xAPIEventStatement, {actor, context, authority});
}

function _buildBaseStatementConfig() {
  this.log('_buildBaseStatementConfig');

  return Object.assign(this.baseStatement.config, {
    platform: navigator ? navigator.userAgent: null,
    language: navigator ? navigator.language : null
  });
}

function _buildBaseStatementContext(actor) {
  var instructor;
  this.log('_getStatementConfigStructure', {actor});

  instructor = actor || null;
  return Object.assign(xAPIEventStatementContext, {instructor});
}
