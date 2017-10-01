import { logger } from './utils/logger';

import { xAPIEventStatement } from './statements/structure';
import { xAPIEventStatementContext } from './statements/context';

import { EventStatus } from './events/event-status';
import { xapiEventValidator } from './events/xapi-event-validator';
import { xapiEvent } from './events/xapi-event';
import { xapiHelpers } from './events/xapi-helpers';

export const log = logger.log;
export const baseStatement = {};
export const events = [];
export const errors = [];
export const targetElements = [];
export const LRS = {};
export const helpers = xapiHelpers;

export const init = function(actor, authority) {
  this.log('init');
  return this.setBaseStatement(actor, authority);
};

export const reset = function() {
  this.log('reset');
  return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
};

export const getTargetElements = function() {
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
};

export const setBaseStatement = function(actor, authority) {
  this.log('setBaseStatement');

  return !!actor && !!authority ?
    _buildBaseStatement.call(this, actor, authority) :
    false;
};

export const setStatementConfigInfo = function() {
  this.log('setStatementConfigInfo');

  return this.baseStatement ?
    _buildBaseStatementConfig.call(this) :
    false;
};

export const listenEnabledEvents = function() {
  this.log('listenEnabledEvents');

  this.events.forEach((xapiEvent) => {
    this.log('xapiEvent', xapiEvent);
    if (_isEnabled.call(this, xapiEvent)) {
      const targetElements = document.querySelectorAll(xapiEvent.elementSelectors);

      targetElements.forEach((targetElement) => {
        if (targetElement) {
          this.log('targetElement', targetElement);
          targetElement.addEventListener(xapiEvent.name, (_event) => {
            xapiEvent.callback.call(this, _event, xapiEvent);
          }, false);
        }
      });
    }
  });
};

export const stopEnabledEvents = function() {
  this.log('stopEnabledEvents');
  this.events.forEach((xapiEvent) => {
    if (_isEnabled.call(this, xapiEvent)) {
      this.targetElements.forEach((targetElement) => {
        targetElement.removeEventListener(xapiEvent.name);
      });
    }
  });
};

export const addEvent = function(eventObj) {
  this.log('addEvent', { eventObj });

  if (this.isValidEvent(eventObj)) {
    const event = Object.assign({}, xapiEvent, eventObj);
    this.events.push(event);
    return true;
  }

  return false;
};

export const addEvents = function(events) {
  this.log('addEvents', { events });

  events.forEach((_event) => {
    this.addEvent(_event);
  });

  this.getTargetElements();
};

export const removeEventById = function(eventId) {
  this.log('removeEventById', { eventId });
  this.events = this.events.filter((xapiEvent) => xapiEvent.id !== eventId);
};

export const removeEventsByElementId = function(elementId) {
  this.log('removeEventsByElementId', { elementId });
  this.events = this.events.filter((xapiEvent) => xapiEvent.elementId !== elementId);
};

export const enableEvent = function(_event) {
  this.log('enableEvent', { _event });
  this.events.forEach((xapiEvent) => {
    if (_event.id === xapiEvent.id) {
      xapiEvent.status = EventStatus.ON;
      return;
    }
  });
};

export const enableAllEvents = function() {
  this.log('enableAllEvents');
  this.events.forEach((xapiEvent) => {
    xapiEvent.status = EventStatus.ON;
  });
};

export const enableEventById = function(eventId) {
  this.log('enableEventById');
  this.events.forEach((xapiEvent) => {
    if (eventId === xapiEvent.id) {
      xapiEvent.status = EventStatus.ON;
      return;
    }
  });
};

export const enableElementsByElementId = function(elementId) {
  this.log('enableElementsByElementId', { elementId });
  this.events.forEach((xapiEvent) => {
    if (elementId === xapiEvent.elementId) {
      xapiEvent.status = EventStatus.ON;
    }
  });
};

export const disableEvent = function(_event) {
  this.log('disableEvent', { _event });
  this.events.forEach((xapiEvent) => {
    if (_event.id === xapiEvent.id) {
      xapiEvent.status = EventStatus.OFF;
      return;
    }
  });
};

export const disableAllEvents = function() {
  this.log('disableAllEvents');
  this.events.forEach((xapiEvent) => {
    xapiEvent.status = EventStatus.OFF;
  });
};

export const disableEventById = function(eventId) {
  this.log('disableEventById', { eventId });
  this.events.forEach((xapiEvent) => {
    if (eventId === xapiEvent.id) {
      xapiEvent.status = EventStatus.OFF;
      return;
    }
  });
};

export const disableElementsByElementId = function(elementId) {
  this.log('disableElementsByElementId', { elementId });
  this.events.forEach((xapiEvent) => {
    if (elementId === xapiEvent.elementId) {
      xapiEvent.status = EventStatus.OFF;
    }
  });
};

export const isValidEvent = function(_event) {
  this.log('isValidEvent', { _event });
  return xapiEventValidator.isValidEvent.call(this, _event);
};

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
