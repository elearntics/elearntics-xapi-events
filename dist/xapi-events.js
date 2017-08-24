(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xapiEvents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventsConfig = void 0;

xAPIEventsConfig = {
  debug: false
};

exports.default = xAPIEventsConfig;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventStatus = Object.freeze({
  ON: 'ON',
  OFF: 'OFF',
  DISABLED: 'DISABLED'
});

exports.EventStatus = EventStatus;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEventValidator = undefined;

var _eventStatus = require('./event-status');

var IS_FUNCTION = '[object Function]',
    MUST_HAVE_ID = 'Must have an id',
    MUST_HAVE_UNIQUE_ID = 'Must have a unique id',
    MUST_HAVE_STATUS = 'Must have a status',
    MUST_HAVE_STATEMENT_PROPERTIES = 'Must have a statement with the required statement properties',
    MUST_HAVE_CALLBACK = 'Must have a correct callback function',
    NOT_VALID = 'Not valid event:',
    VALID = 'Valid event';

var xapiEventValidator = void 0;

exports.xapiEventValidator = xapiEventValidator = {
  isValidEvent: function isValidEvent(e) {
    this.log('isValidEvent', { e: e });
    return !_validateEvent.call(this, e).errors.length;
  }
};

exports.xapiEventValidator = xapiEventValidator;

/* Private */

function _validateEvent(e) {
  this.log('validateEvent', { e: e });
  this.errors = [];

  _mustHaveId.call(this, e);
  _mustHaveUniqueId.call(this, e);
  _mustHaveName.call(this, e);
  _mustHaveStatus.call(this, e);
  _mustHaveCallbackFunction.call(this, e);

  this.errors.length ? this.log(NOT_VALID, { e: e, errors: this.errors }) : this.log(VALID);
  return this;
}

function _mustHaveId(e) {
  this.log('_mustHaveId', { e: e });

  if (!e.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(e) {
  this.log('_mustHaveUniqueId', { e: e });

  if (!!this.events.length || !!this.events.filter(function (xapiEvent) {
    return xapiEvent.id === e.id;
  }).length) {
    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }
  return true;
}

function _mustHaveName(e) {
  this.log('_mustHaveName', { e: e });

  if (!e.name) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveStatus(e) {
  this.log('_mustHaveStatus', { e: e });

  if (!e.status || !_isValidStatus.call(this, e)) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _isValidStatus(e) {
  this.log('isValidStatus', { e: e });
  return e.status === _eventStatus.EventStatus.ON || e.status === _eventStatus.EventStatus.OFF || e.status === _eventStatus.EventStatus.DISABLED;
}

function _mustHaveStatementWithStatementProperties(e) {
  this.log('_mustHaveStatementWithStatementProperties', { e: e });

  if (!!e.statementProperties.filter(function (property) {
    return !e.statement[property];
  }).length) {
    this.errors.push(MUST_HAVE_STATEMENT_PROPERTIES);
    return false;
  }

  return true;
}

function _mustHaveCallbackFunction(e) {
  this.log('_mustHaveCallbackFunction', { e: e });

  if (!e && Object.prototype.toString.call(e.callback) !== IS_FUNCTION) {
    this.errors.push(MUST_HAVE_CALLBACK);
    return false;
  }

  return true;
}

},{"./event-status":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEvent = undefined;

var _eventStatus = require('./event-status');

var xapiEvent = void 0;

exports.xapiEvent = xapiEvent = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: _eventStatus.EventStatus.DISABLED,
  isValid: false,
  statementProperties: []
};

exports.xapiEvent = xapiEvent;

},{"./event-status":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xapiHelpers = void 0;

exports.xapiHelpers = xapiHelpers = {
  getSelection: function getSelection() {
    return window.getSelection().toString();
  }
};

exports.xapiHelpers = xapiHelpers;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var logger = void 0;

logger = {
  debug: _config2.default.debug,
  log: function log() {
    if (!_config2.default.debug) {
      return false;
    }
    try {
      var _console;

      (_console = console).log.apply(_console, arguments);
      return true;
    } catch (reason) {
      return false;
    }
  }
};

exports.default = logger;

},{"../config":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatementContext = void 0;

xAPIEventStatementContext = {
  registration: undefined,
  instructor: undefined,
  team: undefined,
  contextActivities: undefined,
  revision: undefined,
  platform: undefined,
  language: undefined,
  statement: undefined,
  extensions: undefined
};

exports.default = xAPIEventStatementContext;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatement = void 0;

xAPIEventStatement = {
  actor: undefined,
  verb: undefined,
  object: undefined,
  result: undefined,
  context: undefined,
  timestamp: undefined,
  stored: undefined,
  authority: undefined,
  version: undefined,
  attachments: undefined
};

exports.default = xAPIEventStatement;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEvents = undefined;

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _statement = require('./xapi/statement');

var _statement2 = _interopRequireDefault(_statement);

var _statementContext = require('./xapi/statement-context');

var _statementContext2 = _interopRequireDefault(_statementContext);

var _eventStatus = require('./events/event-status');

var _xapiEventValidator = require('./events/xapi-event-validator');

var _xapiEvent = require('./events/xapi-event');

var _xapiHelpers = require('./events/xapi-helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var xapiEvents = exports.xapiEvents = {
  log: _logger2.default.log,
  baseStatement: {},
  events: [],
  errors: [],
  targetElements: [],
  LRS: {},
  helpers: _xapiHelpers.xapiHelpers,

  init: function init(actor, authority) {
    this.log('init');
    return this.setBaseStatement(actor, authority);
  },
  reset: function reset() {
    this.log('reset');
    return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
  },
  getTargetElements: function getTargetElements() {
    var _this = this;

    this.log('getTargetElements');
    this.events.forEach(function (xapiEvent) {
      xapiEvent.elementSelectors.forEach(function (elementSelector) {
        _this.log('elementSelector', elementSelector);
        var elements = document.querySelectorAll(elementSelector);
        if (elements.length) {
          elements.forEach(function (element) {
            _this.log('elements', element);
            _this.targetElements.push(element);
          });
        }
      });
    });
  },
  setBaseStatement: function setBaseStatement(actor, authority) {
    this.log('setBaseStatement');

    return !!actor && !!authority ? _buildBaseStatement.call(this, actor, authority) : false;
  },
  setStatementConfigInfo: function setStatementConfigInfo() {
    this.log('setStatementConfigInfo');

    return this.baseStatement ? _buildBaseStatementConfig.call(this) : false;
  },
  listenEnabledEvents: function listenEnabledEvents() {
    var _this2 = this;

    this.log('listenEnabledEvents');
    this.events.forEach(function (xapiEvent) {
      _this2.log('xapiEvent', xapiEvent);
      if (_isEnabled.call(_this2, xapiEvent)) {
        _this2.targetElements.forEach(function (targetElement) {
          _this2.log('targetElement', targetElement);
          targetElement.addEventListener(xapiEvent.name, function (_event) {
            xapiEvent.callback.call(_this2, _event, xapiEvent);
          }, false);
        });
      }
    });
  },
  stopEnabledEvents: function stopEnabledEvents() {
    var _this3 = this;

    this.log('stopEnabledEvents');
    this.events.forEach(function (xapiEvent) {
      if (_isEnabled.call(_this3, xapiEvent)) {
        _this3.targetElements.forEach(function (targetElement) {
          targetElement.removeEventListener(xapiEvent.name);
        });
      }
    });
  },
  addEvent: function addEvent(eventObj) {
    this.log('addEvent', { eventObj: eventObj });

    if (this.isValidEvent(eventObj)) {
      eventObj = Object.assign(_xapiEvent.xapiEvent, eventObj);
      this.events.push(eventObj);
      return true;
    }

    return false;
  },
  addEvents: function addEvents(events) {
    var _this4 = this;

    this.log('addEvents', { events: events });

    events.forEach(function (_event) {
      _this4.addEvent(_event);
    });

    this.getTargetElements();
  },
  removeEventById: function removeEventById(eventId) {
    this.log('removeEventById', { eventId: eventId });
    this.events = this.events.filter(function (xapiEvent) {
      return xapiEvent.id !== eventId;
    });
  },
  removeEventsByElementId: function removeEventsByElementId(elementId) {
    this.log('removeEventsByElementId', { elementId: elementId });
    this.events = this.events.filter(function (xapiEvent) {
      return xapiEvent.elementId !== elementId;
    });
  },
  enableEvent: function enableEvent(_event) {
    this.log('enableEvent', { _event: _event });
    this.events.forEach(function (xapiEvent) {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
        return;
      }
    });
  },
  enableAllEvents: function enableAllEvents() {
    this.log('enableAllEvents');
    this.events.forEach(function (xapiEvent) {
      xapiEvent.status = _eventStatus.EventStatus.ON;
    });
  },
  enableEventById: function enableEventById(eventId) {
    this.log('enableEventById');
    this.events.forEach(function (xapiEvent) {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
        return;
      }
    });
  },
  enableElementsByElementId: function enableElementsByElementId(elementId) {
    this.log('enableElementsByElementId', { elementId: elementId });
    this.events.forEach(function (xapiEvent) {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
      }
    });
  },
  disableEvent: function disableEvent(_event) {
    this.log('disableEvent', { _event: _event });
    this.events.forEach(function (xapiEvent) {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
        return;
      }
    });
  },
  disableAllEvents: function disableAllEvents() {
    this.log('disableAllEvents');
    this.events.forEach(function (xapiEvent) {
      xapiEvent.status = _eventStatus.EventStatus.OFF;
    });
  },
  disableEventById: function disableEventById(eventId) {
    this.log('disableEventById', { eventId: eventId });
    this.events.forEach(function (xapiEvent) {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
        return;
      }
    });
  },
  disableElementsByElementId: function disableElementsByElementId(elementId) {
    this.log('disableElementsByElementId', { elementId: elementId });
    this.events.forEach(function (xapiEvent) {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
      }
    });
  },
  isValidEvent: function isValidEvent(_event) {
    this.log('isValidEvent', { _event: _event });
    return _xapiEventValidator.xapiEventValidator.isValidEvent.call(this, _event);
  }
};

/* Private */

function _buildBaseStatement(actor, authority) {
  var context = void 0;
  this.log('_buildBaseStatement', { actor: actor, authority: authority });

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, _statement2.default, { actor: actor, context: context, authority: authority });
}

function _buildBaseStatementConfig() {
  var baseStatement = void 0;
  this.log('_buildBaseStatementConfig');

  baseStatement = this.baseStatement;

  return {
    baseStatement: baseStatement,
    platform: navigator ? navigator.userAgent : null,
    language: navigator ? navigator.language : null
  };
}

function _buildBaseStatementContext(actor) {
  var instructor = void 0;
  this.log('_getStatementConfigStructure', { actor: actor });

  instructor = actor || null;
  return Object.assign(_statementContext2.default, { instructor: instructor });
}

function _isEnabled(xapiEvent) {
  this.log('_isEnabled', xapiEvent.status);
  return xapiEvent.status === _eventStatus.EventStatus.ON;
}

},{"./events/event-status":2,"./events/xapi-event":4,"./events/xapi-event-validator":3,"./events/xapi-helpers":5,"./utils/logger":6,"./xapi/statement":8,"./xapi/statement-context":7}]},{},[9])(9)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmpzIiwic3JjL2V2ZW50cy9ldmVudC1zdGF0dXMuanMiLCJzcmMvZXZlbnRzL3hhcGktZXZlbnQtdmFsaWRhdG9yLmpzIiwic3JjL2V2ZW50cy94YXBpLWV2ZW50LmpzIiwic3JjL2V2ZW50cy94YXBpLWhlbHBlcnMuanMiLCJzcmMvdXRpbHMvbG9nZ2VyLmpzIiwic3JjL3hhcGkvc3RhdGVtZW50LWNvbnRleHQuanMiLCJzcmMveGFwaS9zdGF0ZW1lbnQuanMiLCJzcmMveGFwaUV2ZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSx3QkFBSjs7QUFFQTtTQUFBLEFBQW1CLEFBQ1Y7QUFEVSxBQUNqQjs7a0IsQUFHYTs7Ozs7Ozs7QUNOZixJQUFNLHFCQUFjLEFBQU87TUFBTyxBQUM1QixBQUNKO09BRmdDLEFBRTNCLEFBQ0w7WUFIRixBQUFvQixBQUFjLEFBR3RCO0FBSHNCLEFBQ2hDLENBRGtCOztRLEFBTVgsYyxBQUFBOzs7Ozs7Ozs7O0FDTlQ7O0FBRUEsSUFDRSxjQURGLEFBQ2dCO0lBQ2QsZUFGRixBQUVpQjtJQUNmLHNCQUhGLEFBR3dCO0lBQ3RCLG1CQUpGLEFBSXFCO0lBQ25CLGlDQUxGLEFBS21DO0lBQ2pDLHFCQU5GLEFBTXVCO0lBQ3JCLFlBUEYsQUFPYztJQUNaLFFBUkYsQUFRVTs7QUFFVixJQUFJLDBCQUFKOztBQUVBLFFBQUEsQUFPUztBQVBZLHNDQUFBLEFBQ04sR0FBRyxBQUNkO1NBQUEsQUFBSyxJQUFMLEFBQVMsZ0JBQWdCLEVBQUUsR0FBM0IsQUFBeUIsQUFDekI7V0FBTyxDQUFDLGVBQUEsQUFBZSxLQUFmLEFBQW9CLE1BQXBCLEFBQTBCLEdBQTFCLEFBQTZCLE9BQXJDLEFBQTRDLEFBQzdDO0FBSkgsQUFBcUI7QUFBQSxBQUNuQjs7USxBQU1PLHFCLEFBQUE7O0FBRVQ7O0FBRUEsU0FBQSxB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V0FIbEMsQUFBTyxBQUdzQyxBQUU5QztBQUxRLEFBQ0w7OztBQU1KLFNBQUEsQUFBUywyQkFBVCxBQUFvQyxPQUFPLEFBQ3pDO01BQUksa0JBQUosQUFDQTtPQUFBLEFBQUssSUFBTCxBQUFTLGdDQUFnQyxFQUFFLE9BQTNDLEFBQXlDLEFBRXpDOztlQUFhLFNBQWIsQUFBc0IsQUFDdEI7U0FBTyxPQUFBLEFBQU8sbUNBQWtDLEVBQUUsWUFBbEQsQUFBTyxBQUF5QyxBQUNqRDs7O0FBRUQsU0FBQSxBQUFTLFdBQVQsQUFBb0IsV0FBVyxBQUM3QjtPQUFBLEFBQUssSUFBTCxBQUFTLGNBQWMsVUFBdkIsQUFBaUMsQUFDakM7U0FBTyxVQUFBLEFBQVUsV0FBVyx5QkFBNUIsQUFBd0MsQUFDekMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IHhBUElFdmVudHNDb25maWc7XG5cbnhBUElFdmVudHNDb25maWcgPSB7XG4gIGRlYnVnOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgeEFQSUV2ZW50c0NvbmZpZztcbiIsImNvbnN0IEV2ZW50U3RhdHVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIE9OOiAnT04nLFxuICBPRkY6ICdPRkYnLFxuICBESVNBQkxFRDogJ0RJU0FCTEVEJ1xufSk7XG5cbmV4cG9ydCB7IEV2ZW50U3RhdHVzIH07XG4iLCJpbXBvcnQgeyBFdmVudFN0YXR1cyB9IGZyb20gJy4vZXZlbnQtc3RhdHVzJztcblxuY29uc3RcbiAgSVNfRlVOQ1RJT04gPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICBNVVNUX0hBVkVfSUQgPSAnTXVzdCBoYXZlIGFuIGlkJyxcbiAgTVVTVF9IQVZFX1VOSVFVRV9JRCA9ICdNdXN0IGhhdmUgYSB1bmlxdWUgaWQnLFxuICBNVVNUX0hBVkVfU1RBVFVTID0gJ011c3QgaGF2ZSBhIHN0YXR1cycsXG4gIE1VU1RfSEFWRV9TVEFURU1FTlRfUFJPUEVSVElFUyA9ICdNdXN0IGhhdmUgYSBzdGF0ZW1lbnQgd2l0aCB0aGUgcmVxdWlyZWQgc3RhdGVtZW50IHByb3BlcnRpZXMnLFxuICBNVVNUX0hBVkVfQ0FMTEJBQ0sgPSAnTXVzdCBoYXZlIGEgY29ycmVjdCBjYWxsYmFjayBmdW5jdGlvbicsXG4gIE5PVF9WQUxJRCA9ICdOb3QgdmFsaWQgZXZlbnQ6JyxcbiAgVkFMSUQgPSAnVmFsaWQgZXZlbnQnO1xuXG5sZXQgeGFwaUV2ZW50VmFsaWRhdG9yO1xuXG54YXBpRXZlbnRWYWxpZGF0b3IgPSB7XG4gIGlzVmFsaWRFdmVudChlKSB7XG4gICAgdGhpcy5sb2coJ2lzVmFsaWRFdmVudCcsIHsgZSB9KTtcbiAgICByZXR1cm4gIV92YWxpZGF0ZUV2ZW50LmNhbGwodGhpcywgZSkuZXJyb3JzLmxlbmd0aDtcbiAgfVxufTtcblxuZXhwb3J0IHsgeGFwaUV2ZW50VmFsaWRhdG9yIH07XG5cbi8qIFByaXZhdGUgKi9cblxuZnVuY3Rpb24gX3ZhbGlkYXRlRXZlbnQoZSkge1xuICB0aGlzLmxvZygndmFsaWRhdGVFdmVudCcsIHsgZSB9KTtcbiAgdGhpcy5lcnJvcnMgPSBbXTtcblxuICBfbXVzdEhhdmVJZC5jYWxsKHRoaXMsIGUpO1xuICBfbXVzdEhhdmVVbmlxdWVJZC5jYWxsKHRoaXMsIGUpO1xuICBfbXVzdEhhdmVOYW1lLmNhbGwodGhpcywgZSk7XG4gIF9tdXN0SGF2ZVN0YXR1cy5jYWxsKHRoaXMsIGUpO1xuICBfbXVzdEhhdmVDYWxsYmFja0Z1bmN0aW9uLmNhbGwodGhpcywgZSk7XG5cbiAgdGhpcy5lcnJvcnMubGVuZ3RoID8gdGhpcy5sb2coTk9UX1ZBTElELCB7IGUsIGVycm9yczogdGhpcy5lcnJvcnMgfSkgOiB0aGlzLmxvZyhWQUxJRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBfbXVzdEhhdmVJZChlKSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVJZCcsIHsgZSB9KTtcblxuICBpZiAoIWUuaWQpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9JRCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZVVuaXF1ZUlkKGUpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVVuaXF1ZUlkJywgeyBlIH0pO1xuXG4gIGlmICghIXRoaXMuZXZlbnRzLmxlbmd0aCB8fCAhIXRoaXMuZXZlbnRzLmZpbHRlcigoeGFwaUV2ZW50KSA9PiB4YXBpRXZlbnQuaWQgPT09IGUuaWQpLmxlbmd0aCkge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX1VOSVFVRV9JRCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZU5hbWUoZSkge1xuICB0aGlzLmxvZygnX211c3RIYXZlTmFtZScsIHsgZSB9KTtcblxuICBpZiAoIWUubmFtZSkge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0lEKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlU3RhdHVzKGUpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVN0YXR1cycsIHsgZSB9KTtcblxuICBpZiAoIWUuc3RhdHVzIHx8ICFfaXNWYWxpZFN0YXR1cy5jYWxsKHRoaXMsIGUpKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfU1RBVFVTKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2lzVmFsaWRTdGF0dXMoZSkge1xuICB0aGlzLmxvZygnaXNWYWxpZFN0YXR1cycsIHsgZSB9KTtcbiAgcmV0dXJuIChcbiAgICBlLnN0YXR1cyA9PT0gRXZlbnRTdGF0dXMuT04gfHxcbiAgICBlLnN0YXR1cyA9PT0gRXZlbnRTdGF0dXMuT0ZGIHx8XG4gICAgZS5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLkRJU0FCTEVEXG4gICk7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZVN0YXRlbWVudFdpdGhTdGF0ZW1lbnRQcm9wZXJ0aWVzKGUpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVN0YXRlbWVudFdpdGhTdGF0ZW1lbnRQcm9wZXJ0aWVzJywgeyBlIH0pO1xuXG4gIGlmICghIWUuc3RhdGVtZW50UHJvcGVydGllcy5maWx0ZXIoKHByb3BlcnR5KSA9PiAhZS5zdGF0ZW1lbnRbcHJvcGVydHldKS5sZW5ndGgpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9TVEFURU1FTlRfUFJPUEVSVElFUyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZUNhbGxiYWNrRnVuY3Rpb24oZSkge1xuICB0aGlzLmxvZygnX211c3RIYXZlQ2FsbGJhY2tGdW5jdGlvbicsIHsgZSB9KTtcblxuICBpZiAoIWUgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUuY2FsbGJhY2spICE9PSBJU19GVU5DVElPTikge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0NBTExCQUNLKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB7IEV2ZW50U3RhdHVzIH0gZnJvbSAnLi9ldmVudC1zdGF0dXMnO1xubGV0IHhhcGlFdmVudDtcblxueGFwaUV2ZW50ID0ge1xuICBpZDogdW5kZWZpbmVkLFxuICBjYWxsYmFjazogdW5kZWZpbmVkLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIGVsZW1lbnRTZWxlY3RvcnM6IFtdLFxuICB0YXJnZXRFbGVtZW50czogW10sXG4gIHN0YXRlbWVudDogdW5kZWZpbmVkLFxuICBzdGF0dXM6IEV2ZW50U3RhdHVzLkRJU0FCTEVELFxuICBpc1ZhbGlkOiBmYWxzZSxcbiAgc3RhdGVtZW50UHJvcGVydGllczogW10sXG59O1xuXG5leHBvcnQgeyB4YXBpRXZlbnQgfTtcbiIsImxldCB4YXBpSGVscGVycztcblxueGFwaUhlbHBlcnMgPSB7XG4gIGdldFNlbGVjdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHhhcGlIZWxwZXJzIH07XG4iLCJpbXBvcnQgeEFQSUV2ZW50c0NvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5sZXQgbG9nZ2VyO1xuXG5sb2dnZXIgPSB7XG4gIGRlYnVnOiB4QVBJRXZlbnRzQ29uZmlnLmRlYnVnLFxuICBsb2coLi4ubWVzc2FnZSkge1xuICAgIGlmICgheEFQSUV2ZW50c0NvbmZpZy5kZWJ1ZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coLi4ubWVzc2FnZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiIsImxldCB4QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0O1xuXG54QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0ID0ge1xuICByZWdpc3RyYXRpb246IHVuZGVmaW5lZCxcbiAgaW5zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuICB0ZWFtOiB1bmRlZmluZWQsXG4gIGNvbnRleHRBY3Rpdml0aWVzOiB1bmRlZmluZWQsXG4gIHJldmlzaW9uOiB1bmRlZmluZWQsXG4gIHBsYXRmb3JtOiB1bmRlZmluZWQsXG4gIGxhbmd1YWdlOiB1bmRlZmluZWQsXG4gIHN0YXRlbWVudDogdW5kZWZpbmVkLFxuICBleHRlbnNpb25zOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHhBUElFdmVudFN0YXRlbWVudENvbnRleHQ7XG4iLCJsZXQgeEFQSUV2ZW50U3RhdGVtZW50O1xuXG54QVBJRXZlbnRTdGF0ZW1lbnQgPSB7XG4gIGFjdG9yOiB1bmRlZmluZWQsXG4gIHZlcmI6IHVuZGVmaW5lZCxcbiAgb2JqZWN0OiB1bmRlZmluZWQsXG4gIHJlc3VsdDogdW5kZWZpbmVkLFxuICBjb250ZXh0OiB1bmRlZmluZWQsXG4gIHRpbWVzdGFtcDogdW5kZWZpbmVkLFxuICBzdG9yZWQ6IHVuZGVmaW5lZCxcbiAgYXV0aG9yaXR5OiB1bmRlZmluZWQsXG4gIHZlcnNpb246IHVuZGVmaW5lZCxcbiAgYXR0YWNobWVudHM6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgeEFQSUV2ZW50U3RhdGVtZW50O1xuIiwiaW1wb3J0IGxvZ2dlciBmcm9tICcuL3V0aWxzL2xvZ2dlcic7XG5cbmltcG9ydCB4QVBJRXZlbnRTdGF0ZW1lbnQgZnJvbSAnLi94YXBpL3N0YXRlbWVudCc7XG5pbXBvcnQgeEFQSUV2ZW50U3RhdGVtZW50Q29udGV4dCBmcm9tICcuL3hhcGkvc3RhdGVtZW50LWNvbnRleHQnO1xuXG5pbXBvcnQgeyBFdmVudFN0YXR1cyB9IGZyb20gJy4vZXZlbnRzL2V2ZW50LXN0YXR1cyc7XG5pbXBvcnQgeyB4YXBpRXZlbnRWYWxpZGF0b3IgfSBmcm9tICcuL2V2ZW50cy94YXBpLWV2ZW50LXZhbGlkYXRvcic7XG5pbXBvcnQgeyB4YXBpRXZlbnQgfSBmcm9tICcuL2V2ZW50cy94YXBpLWV2ZW50JztcbmltcG9ydCB7IHhhcGlIZWxwZXJzIH0gZnJvbSAnLi9ldmVudHMveGFwaS1oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IHhhcGlFdmVudHMgPSB7XG4gIGxvZzogbG9nZ2VyLmxvZyxcbiAgYmFzZVN0YXRlbWVudDoge30sXG4gIGV2ZW50czogW10sXG4gIGVycm9yczogW10sXG4gIHRhcmdldEVsZW1lbnRzOiBbXSxcbiAgTFJTOiB7fSxcbiAgaGVscGVyczogeGFwaUhlbHBlcnMsXG5cbiAgaW5pdChhY3RvciwgYXV0aG9yaXR5KSB7XG4gICAgdGhpcy5sb2coJ2luaXQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpO1xuICB9LFxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubG9nKCdyZXNldCcpO1xuICAgIHJldHVybiB0aGlzLnNldEJhc2VTdGF0ZW1lbnQodGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvciwgdGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvcml0eSk7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5sb2coJ2dldFRhcmdldEVsZW1lbnRzJyk7XG4gICAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgICB4YXBpRXZlbnQuZWxlbWVudFNlbGVjdG9ycy5mb3JFYWNoKChlbGVtZW50U2VsZWN0b3IpID0+IHtcbiAgICAgICAgdGhpcy5sb2coJ2VsZW1lbnRTZWxlY3RvcicsIGVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdlbGVtZW50cycsIGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBzZXRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpIHtcbiAgICB0aGlzLmxvZygnc2V0QmFzZVN0YXRlbWVudCcpO1xuXG4gICAgcmV0dXJuICEhYWN0b3IgJiYgISFhdXRob3JpdHkgP1xuICAgICAgX2J1aWxkQmFzZVN0YXRlbWVudC5jYWxsKHRoaXMsIGFjdG9yLCBhdXRob3JpdHkpIDpcbiAgICAgIGZhbHNlO1xuICB9LFxuXG4gIHNldFN0YXRlbWVudENvbmZpZ0luZm8oKSB7XG4gICAgdGhpcy5sb2coJ3NldFN0YXRlbWVudENvbmZpZ0luZm8nKTtcblxuICAgIHJldHVybiB0aGlzLmJhc2VTdGF0ZW1lbnQgP1xuICAgICAgX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZy5jYWxsKHRoaXMpIDpcbiAgICAgIGZhbHNlO1xuICB9LFxuXG4gIGxpc3RlbkVuYWJsZWRFdmVudHMoKSB7XG4gICAgdGhpcy5sb2coJ2xpc3RlbkVuYWJsZWRFdmVudHMnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIHRoaXMubG9nKCd4YXBpRXZlbnQnLCB4YXBpRXZlbnQpO1xuICAgICAgaWYgKF9pc0VuYWJsZWQuY2FsbCh0aGlzLCB4YXBpRXZlbnQpKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgodGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nKCd0YXJnZXRFbGVtZW50JywgdGFyZ2V0RWxlbWVudCk7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHhhcGlFdmVudC5uYW1lLCAoX2V2ZW50KSA9PiB7XG4gICAgICAgICAgICB4YXBpRXZlbnQuY2FsbGJhY2suY2FsbCh0aGlzLCBfZXZlbnQsIHhhcGlFdmVudCk7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBzdG9wRW5hYmxlZEV2ZW50cygpIHtcbiAgICB0aGlzLmxvZygnc3RvcEVuYWJsZWRFdmVudHMnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChfaXNFbmFibGVkLmNhbGwodGhpcywgeGFwaUV2ZW50KSkge1xuICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnRzLmZvckVhY2goKHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoeGFwaUV2ZW50Lm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBhZGRFdmVudChldmVudE9iaikge1xuICAgIHRoaXMubG9nKCdhZGRFdmVudCcsIHsgZXZlbnRPYmogfSk7XG5cbiAgICBpZiAodGhpcy5pc1ZhbGlkRXZlbnQoZXZlbnRPYmopKSB7XG4gICAgICBldmVudE9iaiA9IE9iamVjdC5hc3NpZ24oeGFwaUV2ZW50LCBldmVudE9iaik7XG4gICAgICB0aGlzLmV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBhZGRFdmVudHMoZXZlbnRzKSB7XG4gICAgdGhpcy5sb2coJ2FkZEV2ZW50cycsIHsgZXZlbnRzIH0pO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKF9ldmVudCkgPT4ge1xuICAgICAgdGhpcy5hZGRFdmVudChfZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nZXRUYXJnZXRFbGVtZW50cygpO1xuICB9LFxuXG4gIHJlbW92ZUV2ZW50QnlJZChldmVudElkKSB7XG4gICAgdGhpcy5sb2coJ3JlbW92ZUV2ZW50QnlJZCcsIHsgZXZlbnRJZCB9KTtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcigoeGFwaUV2ZW50KSA9PiB4YXBpRXZlbnQuaWQgIT09IGV2ZW50SWQpO1xuICB9LFxuXG4gIHJlbW92ZUV2ZW50c0J5RWxlbWVudElkKGVsZW1lbnRJZCkge1xuICAgIHRoaXMubG9nKCdyZW1vdmVFdmVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5lbGVtZW50SWQgIT09IGVsZW1lbnRJZCk7XG4gIH0sXG5cbiAgZW5hYmxlRXZlbnQoX2V2ZW50KSB7XG4gICAgdGhpcy5sb2coJ2VuYWJsZUV2ZW50JywgeyBfZXZlbnQgfSk7XG4gICAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgICBpZiAoX2V2ZW50LmlkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZW5hYmxlQWxsRXZlbnRzKCkge1xuICAgIHRoaXMubG9nKCdlbmFibGVBbGxFdmVudHMnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PTjtcbiAgICB9KTtcbiAgfSxcblxuICBlbmFibGVFdmVudEJ5SWQoZXZlbnRJZCkge1xuICAgIHRoaXMubG9nKCdlbmFibGVFdmVudEJ5SWQnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudElkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZChlbGVtZW50SWQpIHtcbiAgICB0aGlzLmxvZygnZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnRJZCA9PT0geGFwaUV2ZW50LmVsZW1lbnRJZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT047XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZGlzYWJsZUV2ZW50KF9ldmVudCkge1xuICAgIHRoaXMubG9nKCdkaXNhYmxlRXZlbnQnLCB7IF9ldmVudCB9KTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChfZXZlbnQuaWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZGlzYWJsZUFsbEV2ZW50cygpIHtcbiAgICB0aGlzLmxvZygnZGlzYWJsZUFsbEV2ZW50cycpO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9GRjtcbiAgICB9KTtcbiAgfSxcblxuICBkaXNhYmxlRXZlbnRCeUlkKGV2ZW50SWQpIHtcbiAgICB0aGlzLmxvZygnZGlzYWJsZUV2ZW50QnlJZCcsIHsgZXZlbnRJZCB9KTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudElkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9GRjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRpc2FibGVFbGVtZW50c0J5RWxlbWVudElkKGVsZW1lbnRJZCkge1xuICAgIHRoaXMubG9nKCdkaXNhYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnRJZCA9PT0geGFwaUV2ZW50LmVsZW1lbnRJZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGlzVmFsaWRFdmVudChfZXZlbnQpIHtcbiAgICB0aGlzLmxvZygnaXNWYWxpZEV2ZW50JywgeyBfZXZlbnQgfSk7XG4gICAgcmV0dXJuIHhhcGlFdmVudFZhbGlkYXRvci5pc1ZhbGlkRXZlbnQuY2FsbCh0aGlzLCBfZXZlbnQpO1xuICB9XG59O1xuXG5cbi8qIFByaXZhdGUgKi9cblxuZnVuY3Rpb24gX2J1aWxkQmFzZVN0YXRlbWVudChhY3RvciwgYXV0aG9yaXR5KSB7XG4gIGxldCBjb250ZXh0O1xuICB0aGlzLmxvZygnX2J1aWxkQmFzZVN0YXRlbWVudCcsIHsgYWN0b3IsIGF1dGhvcml0eSB9KTtcblxuICBjb250ZXh0ID0gX2J1aWxkQmFzZVN0YXRlbWVudENvbnRleHQuY2FsbCh0aGlzLCBhY3Rvcik7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMuYmFzZVN0YXRlbWVudCwgeEFQSUV2ZW50U3RhdGVtZW50LCB7IGFjdG9yLCBjb250ZXh0LCBhdXRob3JpdHkgfSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEJhc2VTdGF0ZW1lbnRDb25maWcoKSB7XG4gIGxldCBiYXNlU3RhdGVtZW50O1xuICB0aGlzLmxvZygnX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZycpO1xuXG4gIGJhc2VTdGF0ZW1lbnQgPSB0aGlzLmJhc2VTdGF0ZW1lbnQ7XG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlU3RhdGVtZW50LFxuICAgIHBsYXRmb3JtOiBuYXZpZ2F0b3IgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogbnVsbCxcbiAgICBsYW5ndWFnZTogbmF2aWdhdG9yID8gbmF2aWdhdG9yLmxhbmd1YWdlIDogbnVsbFxuICB9O1xufVxuXG5mdW5jdGlvbiBfYnVpbGRCYXNlU3RhdGVtZW50Q29udGV4dChhY3Rvcikge1xuICBsZXQgaW5zdHJ1Y3RvcjtcbiAgdGhpcy5sb2coJ19nZXRTdGF0ZW1lbnRDb25maWdTdHJ1Y3R1cmUnLCB7IGFjdG9yIH0pO1xuXG4gIGluc3RydWN0b3IgPSBhY3RvciB8fCBudWxsO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih4QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0LCB7IGluc3RydWN0b3IgfSk7XG59XG5cbmZ1bmN0aW9uIF9pc0VuYWJsZWQoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfaXNFbmFibGVkJywgeGFwaUV2ZW50LnN0YXR1cyk7XG4gIHJldHVybiB4YXBpRXZlbnQuc3RhdHVzID09PSBFdmVudFN0YXR1cy5PTjtcbn1cbiJdfQ==
