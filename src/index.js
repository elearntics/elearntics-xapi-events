import logger from './utils/logger';
import xapiEventDefault from './xapi-events/default';
import xapiEventStatus from './xapi-events/status';
import xapiEventValidator from './xapi-events/validator';
import xapiStatementDefault from './xapi-statements/default';
import xapiStatementContext from './xapi-statements/context';
import xapiLrsMiddleware from './xapi-lrs/middleware';

import { fromEvent } from 'rxjs';

export const log = logger.log;
export const baseStatement = {};
export const xapiEvents = [];
export const errors = [];
export const targetElements = {};

export const init = function (actor, authority) {
  this.log('init');
  return this.setBaseStatement(actor, authority);
};

export const reset = function () {
  this.log('reset');
  return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
};

export const getTargetElements = function () {
  this.log('getTargetElements');

  this.xapiEvents.forEach((xapiEvent) => {
    xapiEvent.elementSelectors.forEach((elementSelector) => {
      this.log('elementSelector', elementSelector);
      let elements = document.querySelectorAll(elementSelector);

      if (elements.length) {
        this.targetElements[elementSelector] = this.targetElements[elementSelector] && this.targetElements[elementSelector].length
          ? this.targetElements[elementSelector]
          : {
            elements: [],
            subscriptions: []
          };

        elements.forEach((element) => {
          this.targetElements[elementSelector].elements.push(element);
        });
      }
    });
  });
};

export const setBaseStatement = function (actor, authority) {
  this.log('setBaseStatement');

  return !!actor && !!authority
    ? _buildBaseStatement.call(this, actor, authority)
    : false;
};

export const setStatementConfigInfo = function () {
  this.log('setStatementConfigInfo');

  return this.baseStatement
    ? _buildBaseStatementConfig.call(this)
    : false;
};

export const listenEnabledEvents = function () {
  this.log('listenEnabledEvents');

  this.xapiEvents.forEach((xapiEvent) => {
    this.log('xapiEvent', xapiEvent);

    if (_isEnabled.call(this, xapiEvent)) {
      xapiEvent.elementSelectors.forEach((elementSelector) => {
        const targetElements = this.targetElements[elementSelector];
        if (targetElements.elements.length) {
          const subscription = fromEvent(targetElements.elements, xapiEvent.name);
          subscription.subscribe((e) => xapiEvent.callback.call(this, e, xapiEvent));
          this.targetElements[elementSelector].subscriptions.push(subscription);
        }
      });
    }
  });
};

export const stopEnabledEvents = function () {
  this.log('stopEnabledEvents');

  this.xapiEvents.forEach((xapiEvent) => {
    xapiEvent.elementSelectors.forEach((elementSelector) => {
      if (_isEnabled.call(this, xapiEvent)) {
        let subscriptions = this.targetElements[elementSelector].subscriptions;

        if (subscriptions.length) {
          subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
          });

          this.targetElements[elementSelector].subscriptions = [];
        }
      }
    });
  });
};

export const addEvent = function (xapiEvent) {
  this.log('addEvent', { xapiEvent });

  if (this.isValidEvent(xapiEvent)) {
    this.xapiEvents.push(Object.assign({}, xapiEventDefault, xapiEvent));

    return true;
  }

  return false;
};

export const addEvents = function (xapiEvents) {
  this.log('addEvents', { xapiEvents });

  xapiEvents.forEach((xapiEvent) => {
    this.addEvent(xapiEvent);
  });

  this.getTargetElements();
};

export const removeEventById = function (id) {
  this.log('removeEventById', { id });
  this.xapiEvents = this.xapiEvents.filter((xapiEvent) => xapiEvent.id !== id);
};

export const enableEvent = function (e) {
  this.log('enableEvent', { e });
  this.xapiEvents.forEach((xapiEvent) => {
    if (e.id === xapiEvent.id) {
      xapiEvent.status = xapiEventStatus.ON;
    }
  });
};

export const enableAllEvents = function () {
  this.log('enableAllEvents');
  this.xapiEvents.forEach((xapiEvent) => {
    xapiEvent.status = xapiEventStatus.ON;
  });
};

export const enableEventById = function (id) {
  this.log('enableEventById');
  this.xapiEvents.forEach((xapiEvent) => {
    if (id === xapiEvent.id) {
      xapiEvent.status = xapiEventStatus.ON;
    }
  });
};

export const disableEvent = function (e) {
  this.log('disableEvent', { e });
  this.xapiEvents.forEach((xapiEvent) => {
    if (e.id === xapiEvent.id) {
      xapiEvent.status = xapiEventStatus.OFF;
    }
  });
};

export const disableAllEvents = function () {
  this.log('disableAllEvents');
  this.xapiEvents.forEach((xapiEvent) => {
    xapiEvent.status = xapiEventStatus.OFF;
  });
};

export const disableEventById = function (id) {
  this.log('disableEventById', { id });
  this.xapiEvents.forEach((xapiEvent) => {
    if (id === xapiEvent.id) {
      xapiEvent.status = xapiEventStatus.OFF;
    }
  });
};


export const getDefaultEvent = function () {
  return Object.assign({}, xapiEventDefault);
};

export const getDefaultStatement = function () {
  return Object.assign({}, xapiStatementDefault);
};

export const isValidEvent = function (e) {
  this.log('isValidEvent', { e });
  return xapiEventValidator.isValidEvent.call(this, e);
};

export const LRS = {
  setConfig: function (config) {
    Object.assign(xapiLrsMiddleware.config, config);
  },

  send: function (statement) {
    return xapiLrsMiddleware.connect.post(statement, xapiLrsMiddleware.config);
  }
};

function _buildBaseStatement (actor, authority) {
  let context;
  this.log('_buildBaseStatement', { actor, authority });

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, xapiStatementDefault, { actor, context, authority });
}

function _buildBaseStatementConfig () {
  let baseStatement;
  this.log('_buildBaseStatementConfig');

  baseStatement = this.baseStatement;

  return {
    baseStatement,
    platform: navigator ? navigator.userAgent : null,
    language: navigator ? navigator.language : null
  };
}

function _buildBaseStatementContext (actor) {
  let instructor;
  this.log('_getStatementConfigStructure', { actor });

  instructor = actor || null;
  return Object.assign(xapiStatementContext, { instructor });
}

function _isEnabled (xapiEvent) {
  this.log('_isEnabled', xapiEvent.status);
  return xapiEvent.status === xapiEventStatus.ON;
}
