import logger from './utils/logger';

import xAPIEventStatement from './xapi/statement';
import xAPIEventStatementContext from './xapi/statement-context';

import { EventStatus } from './events/event-status';
import { xapiEventValidator } from './events/xapi-event-validator';

import xapiValidator from 'xapiValidator';

let xapiEvents;

xapiEvents = {
  log: logger.log,
  baseStatement: {},
  events: [],
  targetElements: {},
  errors: [],
  LRS: {},

  init(actor, authority) {
    this.log('init');
    return this.setBaseStatement(actor, authority);
  },

  reset() {
    this.log('reset');
    return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
  },

  getTargetElements() {
    this.events.forEach((xapiEvent) => {
      this.targetElements[xapiEvent.elementId] = this.targetElements[xapiEvent.elementId] || document.getElementById(xapiEvent.elementId);
    });
  },

  isValidStatement() {
    this.log('isValidStatement', this.baseStatement);
    return !xapiValidator.validateStatement(this.baseStatement).errors.length;
  },

  setBaseStatement(actor, authority) {
    this.log('setBaseStatement');

    return !!actor && !!authority ?
      _buildBaseStatement.call(this, actor, authority) :
      false;
  },

  setStatementConfigInfo() {
    this.log('setStatementConfigInfo');

    return this.baseStatement ?
      _buildBaseStatementConfig.call(this) :
      false;
  },

  listenEnabledEvents() {
    this.log('listenEnabledEvents');
    this.events.forEach((xapiEvent) => {
      if (xapiEvent.isEnabled()) {
        this.targetElements[xapiEvent.elementId]
          .addEventListener(xapiEvent.action, xapiEvent.callback);
      }
    });
  },

  stopEnabledEvents() {
    this.log('stopEnabledEvents');
    this.events.forEach((xapiEvent) => {
      if (xapiEvent.isEnabled()) {
        this.targetElements[xapiEvent.elementId]
          .removeEventListener(xapiEvent.action, xapiEvent.callback);
      }
    });
  },

  addEvent(eventObj) {
    this.log('addEvent', { eventObj });
    if (this.isValidEvent(eventObj)) {
      this.events.push(eventObj);
      return true;
    }

    return false;
  },

  addEvents(events) {
    this.log('addEvents', { events });
    events.forEach((eventObj) => {
      this.addEvent(eventObj);
    });
  },

  removeEventById(eventId) {
    this.log('removeEventById', { eventId });
    this.events = this.events.filter((xapiEvent) => xapiEvent.id !== eventId);
  },

  removeEventsByElementId(elementId) {
    this.log('removeEventsByElementId', { elementId });
    this.events = this.events.filter((xapiEvent) => xapiEvent.elementId !== elementId);
  },

  enableEvent(_event) {
    this.log('enableEvent', { _event });
    this.events.forEach((xapiEvent) => {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = EventStatus.ON;
        return;
      }
    });
  },

  enableAllEvents() {
    this.log('enableAllEvents');
    this.events.forEach((xapiEvent) => {
      xapiEvent.status = EventStatus.ON;
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
    this.log('enableElementsByElementId', { elementId });
    this.events.forEach((xapiEvent) => {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = EventStatus.ON;
      }
    });
  },

  disableEvent(_event) {
    this.log('disableEvent', { _event });
    this.events.forEach((xapiEvent) => {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = EventStatus.OFF;
        return;
      }
    });
  },

  disableAllEvents() {
    this.log('disableAllEvents');
    this.events.forEach((xapiEvent) => {
      xapiEvent.status = EventStatus.OFF;
    });
  },

  disableEventById(eventId) {
    this.log('disableEventById', { eventId });
    this.events.forEach((xapiEvent) => {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = EventStatus.OFF;
        return;
      }
    });
  },

  disableElementsByElementId(elementId) {
    this.log('disableElementsByElementId', { elementId });
    this.events.forEach((xapiEvent) => {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = EventStatus.OFF;
      }
    });
  },

  isValidEvent(_event) {
    this.log('isValidEvent', { _event });
    return xapiEventValidator.isValidEvent.call(this, _event);
  }
};

export default xapiEvents;


/* Private */

function _buildBaseStatement(actor, authority) {
  let context;
  this.log('_buildBaseStatement', { actor, authority });

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, xAPIEventStatement, { actor, context, authority });
}

function _buildBaseStatementConfig() {
  let baseStatement;
  this.log('_buildBaseStatementConfig');

  baseStatement = this.baseStatement;

  return {
    baseStatement,
    platform: navigator ? navigator.userAgent : null,
    language: navigator ? navigator.language : null
  };
}

function _buildBaseStatementContext(actor) {
  let instructor;
  this.log('_getStatementConfigStructure', { actor });

  instructor = actor || null;
  return Object.assign(xAPIEventStatementContext, { instructor });
}
