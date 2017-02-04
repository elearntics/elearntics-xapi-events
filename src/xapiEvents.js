import logger from './utils/logger';

import xAPIEventStatement from './xapi/statement';
import xAPIEventStatementContext from './xapi/statement-context';

import { EventStatus } from './events/event-status';
import { xapiEventValidator } from './events/xapi-event-validator';
import { xapiEvent } from './events/xapi-event';
import { xapiHelpers } from './events/xapi-helpers';

export let config = {
  log: logger.log,
  baseStatement: {},
  events: [],
  errors: [],
  targetElements: [],
  LRS: {},
  helpers: xapiHelpers,

  init(actor, authority) {
    this.log('init');
    return this.setBaseStatement(actor, authority);
  },

  reset() {
    this.log('reset');
    return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
  },

  getTargetElements() {
    this.log('getTargetElements');
    this.events.forEach((xapiEvent) => {
      xapiEvent.elementSelectors.forEach((elementSelector) => {
        this.log('elementSelector', elementSelector);
        let elements = document.querySelectorAll(elementSelector);
        if (elements.length) {
          elements.forEach((element) => {
            this.log('elements', element);
            this.targetElements.push(element);
          });
        }
      });
    });
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
      this.log('xapiEvent', xapiEvent);
      if (_isEnabled.call(this, xapiEvent)) {
        this.targetElements.forEach((targetElement) => {
          this.log('targetElement', targetElement);
          targetElement.addEventListener(xapiEvent.name, (_event) => {
            xapiEvent.callback.call(this, _event, xapiEvent);
          }, false);
        });
      }
    });
  },

  stopEnabledEvents() {
    this.log('stopEnabledEvents');
    this.events.forEach((xapiEvent) => {
      if (_isEnabled.call(this, xapiEvent)) {
        this.targetElements.forEach((targetElement) => {
          targetElement.removeEventListener(xapiEvent.name);
        });
      }
    });
  },

  addEvent(eventObj) {
    this.log('addEvent', { eventObj });

    if (this.isValidEvent(eventObj)) {
      eventObj = Object.assign(xapiEvent, eventObj);
      this.events.push(eventObj);
      return true;
    }

    return false;
  },

  addEvents(events) {
    this.log('addEvents', { events });

    events.forEach((_event) => {
      this.addEvent(_event);
    });

    this.getTargetElements();
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

function _isEnabled(xapiEvent) {
  this.log('_isEnabled', xapiEvent.status);
  return xapiEvent.status === EventStatus.ON;
}
