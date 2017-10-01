(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xapiEvents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventsConfig = exports.xAPIEventsConfig = {
  debug: false
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventStatus = exports.EventStatus = Object.freeze({
  ON: 'ON',
  OFF: 'OFF',
  DISABLED: 'DISABLED'
});

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEventValidator = undefined;

var _eventStatus = require('./event-status');

var IS_FUNCTION = '[object Function]';
var MUST_HAVE_ID = 'Must have an id';
var MUST_HAVE_UNIQUE_ID = 'Must have a unique id';
var MUST_HAVE_STATUS = 'Must have a status';
var MUST_HAVE_CALLBACK = 'Must have a correct callback function';
var NOT_VALID = 'Not valid event:';
var VALID = 'Valid event';

var xapiEventValidator = exports.xapiEventValidator = {
  isValidEvent: function isValidEvent(e) {
    this.log('isValidEvent', { e: e });
    return !_hasErrors.call(this, e).errors.length;
  }
};

function _hasErrors(xapiEvent) {
  this.log('validateEvent', { xapiEvent: xapiEvent });
  this.errors = [];

  _mustHaveId.call(this, xapiEvent);
  _mustHaveUniqueId.call(this, xapiEvent);
  _mustHaveName.call(this, xapiEvent);
  _mustHaveStatus.call(this, xapiEvent);
  _mustHaveCallbackFunction.call(this, xapiEvent);

  this.errors.length ? this.log(NOT_VALID, { event: xapiEvent, errors: this.errors }) : this.log(VALID);

  return this;
}

function _mustHaveId(xapiEvent) {
  this.log('_mustHaveId', { xapiEvent: xapiEvent });

  if (!xapiEvent.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(xapiEvent) {
  this.log('_mustHaveUniqueId', { xapiEvent: xapiEvent });
  if (!!this.events.length && !!this.events.filter(function (xapiEvent) {
    return xapiEvent.id === xapiEvent.id;
  }).length) {

    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }

  return true;
}

function _mustHaveName(xapiEvent) {
  this.log('_mustHaveName', { xapiEvent: xapiEvent });

  if (!xapiEvent.name) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveStatus(xapiEvent) {
  this.log('_mustHaveStatus', { xapiEvent: xapiEvent });

  if (!xapiEvent.status || !_isValidStatus.call(this, xapiEvent)) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _isValidStatus(xapiEvent) {
  this.log('isValidStatus', { xapiEvent: xapiEvent });
  return xapiEvent.status === _eventStatus.EventStatus.ON || xapiEvent.status === _eventStatus.EventStatus.OFF || xapiEvent.status === _eventStatus.EventStatus.DISABLED;
}

function _mustHaveCallbackFunction(xapiEvent) {
  this.log('_mustHaveCallbackFunction', { xapiEvent: xapiEvent });

  if (!xapiEvent && Object.prototype.toString.call(xapiEvent.callback) !== IS_FUNCTION) {
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

var xapiEvent = exports.xapiEvent = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: _eventStatus.EventStatus.DISABLED,
  isValid: false
};

},{"./event-status":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xapiHelpers = exports.xapiHelpers = {
  getSelection: function getSelection() {
    return window.getSelection().toString();
  }
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatementContext = exports.xAPIEventStatementContext = {
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatement = exports.xAPIEventStatement = {
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _config = require('../config');

var logger = exports.logger = {
  debug: _config.xAPIEventsConfig.debug,
  log: function log() {
    if (!_config.xAPIEventsConfig.debug) {
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

},{"../config":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEvent = exports.disableElementsByElementId = exports.disableEventById = exports.disableAllEvents = exports.disableEvent = exports.enableElementsByElementId = exports.enableEventById = exports.enableAllEvents = exports.enableEvent = exports.removeEventsByElementId = exports.removeEventById = exports.addEvents = exports.addEvent = exports.stopEnabledEvents = exports.listenEnabledEvents = exports.setStatementConfigInfo = exports.setBaseStatement = exports.getTargetElements = exports.reset = exports.init = exports.helpers = exports.LRS = exports.targetElements = exports.errors = exports.events = exports.baseStatement = exports.log = undefined;

var _logger = require('./utils/logger');

var _structure = require('./statements/structure');

var _context = require('./statements/context');

var _eventStatus = require('./events/event-status');

var _xapiEventValidator = require('./events/xapi-event-validator');

var _xapiEvent = require('./events/xapi-event');

var _xapiHelpers = require('./events/xapi-helpers');

var log = exports.log = _logger.logger.log;
var baseStatement = exports.baseStatement = {};
var events = exports.events = [];
var errors = exports.errors = [];
var targetElements = exports.targetElements = [];
var LRS = exports.LRS = {};
var helpers = exports.helpers = _xapiHelpers.xapiHelpers;

var init = exports.init = function init(actor, authority) {
  this.log('init');
  return this.setBaseStatement(actor, authority);
};

var reset = exports.reset = function reset() {
  this.log('reset');
  return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
};

var getTargetElements = exports.getTargetElements = function getTargetElements() {
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
};

var setBaseStatement = exports.setBaseStatement = function setBaseStatement(actor, authority) {
  this.log('setBaseStatement');

  return !!actor && !!authority ? _buildBaseStatement.call(this, actor, authority) : false;
};

var setStatementConfigInfo = exports.setStatementConfigInfo = function setStatementConfigInfo() {
  this.log('setStatementConfigInfo');

  return this.baseStatement ? _buildBaseStatementConfig.call(this) : false;
};

var listenEnabledEvents = exports.listenEnabledEvents = function listenEnabledEvents() {
  var _this2 = this;

  this.log('listenEnabledEvents');

  this.events.forEach(function (xapiEvent) {
    _this2.log('xapiEvent', xapiEvent);
    if (_isEnabled.call(_this2, xapiEvent)) {
      var _targetElements = document.querySelectorAll(xapiEvent.elementSelectors);

      _targetElements.forEach(function (targetElement) {
        if (targetElement) {
          _this2.log('targetElement', targetElement);
          targetElement.addEventListener(xapiEvent.name, function (_event) {
            xapiEvent.callback.call(_this2, _event, xapiEvent);
          }, false);
        }
      });
    }
  });
};

var stopEnabledEvents = exports.stopEnabledEvents = function stopEnabledEvents() {
  var _this3 = this;

  this.log('stopEnabledEvents');
  this.events.forEach(function (xapiEvent) {
    if (_isEnabled.call(_this3, xapiEvent)) {
      _this3.targetElements.forEach(function (targetElement) {
        targetElement.removeEventListener(xapiEvent.name);
      });
    }
  });
};

var addEvent = exports.addEvent = function addEvent(eventObj) {
  this.log('addEvent', { eventObj: eventObj });

  if (this.isValidEvent(eventObj)) {
    var event = Object.assign({}, _xapiEvent.xapiEvent, eventObj);
    this.events.push(event);
    return true;
  }

  return false;
};

var addEvents = exports.addEvents = function addEvents(events) {
  var _this4 = this;

  this.log('addEvents', { events: events });

  events.forEach(function (_event) {
    _this4.addEvent(_event);
  });

  this.getTargetElements();
};

var removeEventById = exports.removeEventById = function removeEventById(eventId) {
  this.log('removeEventById', { eventId: eventId });
  this.events = this.events.filter(function (xapiEvent) {
    return xapiEvent.id !== eventId;
  });
};

var removeEventsByElementId = exports.removeEventsByElementId = function removeEventsByElementId(elementId) {
  this.log('removeEventsByElementId', { elementId: elementId });
  this.events = this.events.filter(function (xapiEvent) {
    return xapiEvent.elementId !== elementId;
  });
};

var enableEvent = exports.enableEvent = function enableEvent(_event) {
  this.log('enableEvent', { _event: _event });
  this.events.forEach(function (xapiEvent) {
    if (_event.id === xapiEvent.id) {
      xapiEvent.status = _eventStatus.EventStatus.ON;
      return;
    }
  });
};

var enableAllEvents = exports.enableAllEvents = function enableAllEvents() {
  this.log('enableAllEvents');
  this.events.forEach(function (xapiEvent) {
    xapiEvent.status = _eventStatus.EventStatus.ON;
  });
};

var enableEventById = exports.enableEventById = function enableEventById(eventId) {
  this.log('enableEventById');
  this.events.forEach(function (xapiEvent) {
    if (eventId === xapiEvent.id) {
      xapiEvent.status = _eventStatus.EventStatus.ON;
      return;
    }
  });
};

var enableElementsByElementId = exports.enableElementsByElementId = function enableElementsByElementId(elementId) {
  this.log('enableElementsByElementId', { elementId: elementId });
  this.events.forEach(function (xapiEvent) {
    if (elementId === xapiEvent.elementId) {
      xapiEvent.status = _eventStatus.EventStatus.ON;
    }
  });
};

var disableEvent = exports.disableEvent = function disableEvent(_event) {
  this.log('disableEvent', { _event: _event });
  this.events.forEach(function (xapiEvent) {
    if (_event.id === xapiEvent.id) {
      xapiEvent.status = _eventStatus.EventStatus.OFF;
      return;
    }
  });
};

var disableAllEvents = exports.disableAllEvents = function disableAllEvents() {
  this.log('disableAllEvents');
  this.events.forEach(function (xapiEvent) {
    xapiEvent.status = _eventStatus.EventStatus.OFF;
  });
};

var disableEventById = exports.disableEventById = function disableEventById(eventId) {
  this.log('disableEventById', { eventId: eventId });
  this.events.forEach(function (xapiEvent) {
    if (eventId === xapiEvent.id) {
      xapiEvent.status = _eventStatus.EventStatus.OFF;
      return;
    }
  });
};

var disableElementsByElementId = exports.disableElementsByElementId = function disableElementsByElementId(elementId) {
  this.log('disableElementsByElementId', { elementId: elementId });
  this.events.forEach(function (xapiEvent) {
    if (elementId === xapiEvent.elementId) {
      xapiEvent.status = _eventStatus.EventStatus.OFF;
    }
  });
};

var isValidEvent = exports.isValidEvent = function isValidEvent(_event) {
  this.log('isValidEvent', { _event: _event });
  return _xapiEventValidator.xapiEventValidator.isValidEvent.call(this, _event);
};

function _buildBaseStatement(actor, authority) {
  var context = void 0;
  this.log('_buildBaseStatement', { actor: actor, authority: authority });

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, _structure.xAPIEventStatement, { actor: actor, context: context, authority: authority });
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
  return Object.assign(_context.xAPIEventStatementContext, { instructor: instructor });
}

function _isEnabled(xapiEvent) {
  this.log('_isEnabled', xapiEvent.status);
  return xapiEvent.status === _eventStatus.EventStatus.ON;
}

},{"./events/event-status":2,"./events/xapi-event":4,"./events/xapi-event-validator":3,"./events/xapi-helpers":5,"./statements/context":6,"./statements/structure":7,"./utils/logger":8}]},{},[9])(9)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmpzIiwic3JjL2V2ZW50cy9ldmVudC1zdGF0dXMuanMiLCJzcmMvZXZlbnRzL3hhcGktZXZlbnQtdmFsaWRhdG9yLmpzIiwic3JjL2V2ZW50cy94YXBpLWV2ZW50LmpzIiwic3JjL2V2ZW50cy94YXBpLWhlbHBlcnMuanMiLCJzcmMvc3RhdGVtZW50cy9jb250ZXh0LmpzIiwic3JjL3N0YXRlbWVudHMvc3RydWN0dXJlLmpzIiwic3JjL3V0aWxzL2xvZ2dlci5qcyIsInNyYy94YXBpRXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBTyxJQUFNO1NBQU4sQUFBeUIsQUFDdkI7QUFEdUIsQUFDOUI7Ozs7Ozs7O0FDREssSUFBTSwyQ0FBYyxBQUFPO01BQU8sQUFDbkMsQUFDSjtPQUZ1QyxBQUVsQyxBQUNMO1lBSEssQUFBb0IsQUFBYyxBQUc3QjtBQUg2QixBQUN2QyxDQUR5Qjs7Ozs7Ozs7OztBQ0EzQjs7QUFFQSxJQUFPLGNBQVAsQUFBcUI7QUFDckIsSUFBTyxlQUFQLEFBQXNCO0FBQ3RCLElBQU8sc0JBQVAsQUFBNkI7QUFDN0IsSUFBTyxtQkFBUCxBQUEwQjtBQUMxQixJQUFPLHFCQUFQLEFBQTRCO0FBQzVCLElBQU8sWUFBUCxBQUFtQjtBQUNuQixJQUFPLFFBQVAsQUFBZTs7QUFFUixJQUFNO0FBQXFCLHNDQUFBLEFBQ25CLEdBQUcsQUFDZDtTQUFBLEFBQUssSUFBTCxBQUFTLGdCQUFnQixFQUFFLEdBQTNCLEFBQXlCLEFBQ3pCO1dBQU8sQ0FBQyxXQUFBLEFBQVcsS0FBWCxBQUFnQixNQUFoQixBQUFzQixHQUF0QixBQUF5QixPQUFqQyxBQUF3QyxBQUN6QztBQUpJLEFBQTJCO0FBQUEsQUFDaEM7O0FBTUYsU0FBQSxBQUFTLFdBQVQsQUFBb0IsV0FBVyxBQUM3QjtPQUFBLEFBQUssSUFBTCxBQUFTLGlCQUFpQixFQUFF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U0FBYixBQUFzQixBQUN0QjtTQUFPLE9BQUEsQUFBTywyQ0FBa0MsRUFBRSxZQUFsRCxBQUFPLEFBQXlDLEFBQ2pEOzs7QUFFRCxTQUFBLEFBQVMsV0FBVCxBQUFvQixXQUFXLEFBQzdCO09BQUEsQUFBSyxJQUFMLEFBQVMsY0FBYyxVQUF2QixBQUFpQyxBQUNqQztTQUFPLFVBQUEsQUFBVSxXQUFXLHlCQUE1QixBQUF3QyxBQUN6QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgeEFQSUV2ZW50c0NvbmZpZyA9IHtcbiAgZGVidWc6IGZhbHNlXG59O1xuIiwiZXhwb3J0IGNvbnN0IEV2ZW50U3RhdHVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIE9OOiAnT04nLFxuICBPRkY6ICdPRkYnLFxuICBESVNBQkxFRDogJ0RJU0FCTEVEJ1xufSk7XG4iLCJpbXBvcnQgeyBFdmVudFN0YXR1cyB9IGZyb20gJy4vZXZlbnQtc3RhdHVzJztcblxuY29uc3QgIElTX0ZVTkNUSU9OID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbmNvbnN0ICBNVVNUX0hBVkVfSUQgPSAnTXVzdCBoYXZlIGFuIGlkJztcbmNvbnN0ICBNVVNUX0hBVkVfVU5JUVVFX0lEID0gJ011c3QgaGF2ZSBhIHVuaXF1ZSBpZCc7XG5jb25zdCAgTVVTVF9IQVZFX1NUQVRVUyA9ICdNdXN0IGhhdmUgYSBzdGF0dXMnO1xuY29uc3QgIE1VU1RfSEFWRV9DQUxMQkFDSyA9ICdNdXN0IGhhdmUgYSBjb3JyZWN0IGNhbGxiYWNrIGZ1bmN0aW9uJztcbmNvbnN0ICBOT1RfVkFMSUQgPSAnTm90IHZhbGlkIGV2ZW50Oic7XG5jb25zdCAgVkFMSUQgPSAnVmFsaWQgZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgeGFwaUV2ZW50VmFsaWRhdG9yID0ge1xuICBpc1ZhbGlkRXZlbnQoZSkge1xuICAgIHRoaXMubG9nKCdpc1ZhbGlkRXZlbnQnLCB7IGUgfSk7XG4gICAgcmV0dXJuICFfaGFzRXJyb3JzLmNhbGwodGhpcywgZSkuZXJyb3JzLmxlbmd0aDtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2hhc0Vycm9ycyh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ3ZhbGlkYXRlRXZlbnQnLCB7IHhhcGlFdmVudCB9KTtcbiAgdGhpcy5lcnJvcnMgPSBbXTtcblxuICBfbXVzdEhhdmVJZC5jYWxsKHRoaXMsIHhhcGlFdmVudCk7XG4gIF9tdXN0SGF2ZVVuaXF1ZUlkLmNhbGwodGhpcywgeGFwaUV2ZW50KTtcbiAgX211c3RIYXZlTmFtZS5jYWxsKHRoaXMsIHhhcGlFdmVudCk7XG4gIF9tdXN0SGF2ZVN0YXR1cy5jYWxsKHRoaXMsIHhhcGlFdmVudCk7XG4gIF9tdXN0SGF2ZUNhbGxiYWNrRnVuY3Rpb24uY2FsbCh0aGlzLCB4YXBpRXZlbnQpO1xuXG4gIHRoaXMuZXJyb3JzLmxlbmd0aFxuICAgID8gdGhpcy5sb2coTk9UX1ZBTElELCB7IGV2ZW50OiB4YXBpRXZlbnQsIGVycm9yczogdGhpcy5lcnJvcnMgfSlcbiAgICA6IHRoaXMubG9nKFZBTElEKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlSWQoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVJZCcsIHsgeGFwaUV2ZW50IH0pO1xuXG4gIGlmICgheGFwaUV2ZW50LmlkKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfSUQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBfbXVzdEhhdmVVbmlxdWVJZCh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVVuaXF1ZUlkJywgeyB4YXBpRXZlbnQgfSk7XG4gIGlmICghIXRoaXMuZXZlbnRzLmxlbmd0aCAmJlxuICAgICEhdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5pZCA9PT0geGFwaUV2ZW50LmlkKS5sZW5ndGgpIHtcblxuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX1VOSVFVRV9JRCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZU5hbWUoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVOYW1lJywgeyB4YXBpRXZlbnQgfSk7XG5cbiAgaWYgKCF4YXBpRXZlbnQubmFtZSkge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0lEKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlU3RhdHVzKHhhcGlFdmVudCkge1xuICB0aGlzLmxvZygnX211c3RIYXZlU3RhdHVzJywgeyB4YXBpRXZlbnQgfSk7XG5cbiAgaWYgKCF4YXBpRXZlbnQuc3RhdHVzIHx8ICFfaXNWYWxpZFN0YXR1cy5jYWxsKHRoaXMsIHhhcGlFdmVudCkpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9TVEFUVVMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBfaXNWYWxpZFN0YXR1cyh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ2lzVmFsaWRTdGF0dXMnLCB7IHhhcGlFdmVudCB9KTtcbiAgcmV0dXJuIChcbiAgICB4YXBpRXZlbnQuc3RhdHVzID09PSBFdmVudFN0YXR1cy5PTiB8fFxuICAgIHhhcGlFdmVudC5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLk9GRiB8fFxuICAgIHhhcGlFdmVudC5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLkRJU0FCTEVEXG4gICk7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZUNhbGxiYWNrRnVuY3Rpb24oeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVDYWxsYmFja0Z1bmN0aW9uJywgeyB4YXBpRXZlbnQgfSk7XG5cbiAgaWYgKCF4YXBpRXZlbnQgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeGFwaUV2ZW50LmNhbGxiYWNrKSAhPT0gSVNfRlVOQ1RJT04pIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9DQUxMQkFDSyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgeyBFdmVudFN0YXR1cyB9IGZyb20gJy4vZXZlbnQtc3RhdHVzJztcblxuZXhwb3J0IGNvbnN0IHhhcGlFdmVudCA9IHtcbiAgaWQ6IHVuZGVmaW5lZCxcbiAgY2FsbGJhY2s6IHVuZGVmaW5lZCxcbiAgbmFtZTogdW5kZWZpbmVkLFxuICBlbGVtZW50U2VsZWN0b3JzOiBbXSxcbiAgdGFyZ2V0RWxlbWVudHM6IFtdLFxuICBzdGF0ZW1lbnQ6IHVuZGVmaW5lZCxcbiAgc3RhdHVzOiBFdmVudFN0YXR1cy5ESVNBQkxFRCxcbiAgaXNWYWxpZDogZmFsc2Vcbn07XG4iLCJleHBvcnQgY29uc3QgeGFwaUhlbHBlcnMgPSB7XG4gIGdldFNlbGVjdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG4gIH1cbn07XG4iLCJleHBvcnQgY29uc3QgeEFQSUV2ZW50U3RhdGVtZW50Q29udGV4dCA9IHtcbiAgcmVnaXN0cmF0aW9uOiB1bmRlZmluZWQsXG4gIGluc3RydWN0b3I6IHVuZGVmaW5lZCxcbiAgdGVhbTogdW5kZWZpbmVkLFxuICBjb250ZXh0QWN0aXZpdGllczogdW5kZWZpbmVkLFxuICByZXZpc2lvbjogdW5kZWZpbmVkLFxuICBwbGF0Zm9ybTogdW5kZWZpbmVkLFxuICBsYW5ndWFnZTogdW5kZWZpbmVkLFxuICBzdGF0ZW1lbnQ6IHVuZGVmaW5lZCxcbiAgZXh0ZW5zaW9uczogdW5kZWZpbmVkXG59O1xuIiwiZXhwb3J0IGNvbnN0IHhBUElFdmVudFN0YXRlbWVudCA9IHtcbiAgYWN0b3I6IHVuZGVmaW5lZCxcbiAgdmVyYjogdW5kZWZpbmVkLFxuICBvYmplY3Q6IHVuZGVmaW5lZCxcbiAgcmVzdWx0OiB1bmRlZmluZWQsXG4gIGNvbnRleHQ6IHVuZGVmaW5lZCxcbiAgdGltZXN0YW1wOiB1bmRlZmluZWQsXG4gIHN0b3JlZDogdW5kZWZpbmVkLFxuICBhdXRob3JpdHk6IHVuZGVmaW5lZCxcbiAgdmVyc2lvbjogdW5kZWZpbmVkLFxuICBhdHRhY2htZW50czogdW5kZWZpbmVkXG59O1xuIiwiaW1wb3J0IHsgeEFQSUV2ZW50c0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBsb2dnZXIgPSB7XG4gIGRlYnVnOiB4QVBJRXZlbnRzQ29uZmlnLmRlYnVnLFxuICBsb2coLi4ubWVzc2FnZSkge1xuICAgIGlmICgheEFQSUV2ZW50c0NvbmZpZy5kZWJ1ZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coLi4ubWVzc2FnZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL3V0aWxzL2xvZ2dlcic7XG5cbmltcG9ydCB7IHhBUElFdmVudFN0YXRlbWVudCB9IGZyb20gJy4vc3RhdGVtZW50cy9zdHJ1Y3R1cmUnO1xuaW1wb3J0IHsgeEFQSUV2ZW50U3RhdGVtZW50Q29udGV4dCB9IGZyb20gJy4vc3RhdGVtZW50cy9jb250ZXh0JztcblxuaW1wb3J0IHsgRXZlbnRTdGF0dXMgfSBmcm9tICcuL2V2ZW50cy9ldmVudC1zdGF0dXMnO1xuaW1wb3J0IHsgeGFwaUV2ZW50VmFsaWRhdG9yIH0gZnJvbSAnLi9ldmVudHMveGFwaS1ldmVudC12YWxpZGF0b3InO1xuaW1wb3J0IHsgeGFwaUV2ZW50IH0gZnJvbSAnLi9ldmVudHMveGFwaS1ldmVudCc7XG5pbXBvcnQgeyB4YXBpSGVscGVycyB9IGZyb20gJy4vZXZlbnRzL3hhcGktaGVscGVycyc7XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBsb2dnZXIubG9nO1xuZXhwb3J0IGNvbnN0IGJhc2VTdGF0ZW1lbnQgPSB7fTtcbmV4cG9ydCBjb25zdCBldmVudHMgPSBbXTtcbmV4cG9ydCBjb25zdCBlcnJvcnMgPSBbXTtcbmV4cG9ydCBjb25zdCB0YXJnZXRFbGVtZW50cyA9IFtdO1xuZXhwb3J0IGNvbnN0IExSUyA9IHt9O1xuZXhwb3J0IGNvbnN0IGhlbHBlcnMgPSB4YXBpSGVscGVycztcblxuZXhwb3J0IGNvbnN0IGluaXQgPSBmdW5jdGlvbihhY3RvciwgYXV0aG9yaXR5KSB7XG4gIHRoaXMubG9nKCdpbml0Jyk7XG4gIHJldHVybiB0aGlzLnNldEJhc2VTdGF0ZW1lbnQoYWN0b3IsIGF1dGhvcml0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2coJ3Jlc2V0Jyk7XG4gIHJldHVybiB0aGlzLnNldEJhc2VTdGF0ZW1lbnQodGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvciwgdGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvcml0eSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGFyZ2V0RWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2coJ2dldFRhcmdldEVsZW1lbnRzJyk7XG5cbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgeGFwaUV2ZW50LmVsZW1lbnRTZWxlY3RvcnMuZm9yRWFjaCgoZWxlbWVudFNlbGVjdG9yKSA9PiB7XG4gICAgICB0aGlzLmxvZygnZWxlbWVudFNlbGVjdG9yJywgZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudFNlbGVjdG9yKTtcblxuICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2coJ2VsZW1lbnRzJywgZWxlbWVudCk7XG4gICAgICAgICAgdGhpcy50YXJnZXRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QmFzZVN0YXRlbWVudCA9IGZ1bmN0aW9uKGFjdG9yLCBhdXRob3JpdHkpIHtcbiAgdGhpcy5sb2coJ3NldEJhc2VTdGF0ZW1lbnQnKTtcblxuICByZXR1cm4gISFhY3RvciAmJiAhIWF1dGhvcml0eSA/XG4gICAgX2J1aWxkQmFzZVN0YXRlbWVudC5jYWxsKHRoaXMsIGFjdG9yLCBhdXRob3JpdHkpIDpcbiAgICBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRTdGF0ZW1lbnRDb25maWdJbmZvID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdzZXRTdGF0ZW1lbnRDb25maWdJbmZvJyk7XG5cbiAgcmV0dXJuIHRoaXMuYmFzZVN0YXRlbWVudCA/XG4gICAgX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZy5jYWxsKHRoaXMpIDpcbiAgICBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5FbmFibGVkRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdsaXN0ZW5FbmFibGVkRXZlbnRzJyk7XG5cbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgdGhpcy5sb2coJ3hhcGlFdmVudCcsIHhhcGlFdmVudCk7XG4gICAgaWYgKF9pc0VuYWJsZWQuY2FsbCh0aGlzLCB4YXBpRXZlbnQpKSB7XG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoeGFwaUV2ZW50LmVsZW1lbnRTZWxlY3RvcnMpO1xuXG4gICAgICB0YXJnZXRFbGVtZW50cy5mb3JFYWNoKCh0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5sb2coJ3RhcmdldEVsZW1lbnQnLCB0YXJnZXRFbGVtZW50KTtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoeGFwaUV2ZW50Lm5hbWUsIChfZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHhhcGlFdmVudC5jYWxsYmFjay5jYWxsKHRoaXMsIF9ldmVudCwgeGFwaUV2ZW50KTtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcEVuYWJsZWRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2coJ3N0b3BFbmFibGVkRXZlbnRzJyk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChfaXNFbmFibGVkLmNhbGwodGhpcywgeGFwaUV2ZW50KSkge1xuICAgICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKCh0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih4YXBpRXZlbnQubmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnRPYmopIHtcbiAgdGhpcy5sb2coJ2FkZEV2ZW50JywgeyBldmVudE9iaiB9KTtcblxuICBpZiAodGhpcy5pc1ZhbGlkRXZlbnQoZXZlbnRPYmopKSB7XG4gICAgY29uc3QgZXZlbnQgPSBPYmplY3QuYXNzaWduKHt9LCB4YXBpRXZlbnQsIGV2ZW50T2JqKTtcbiAgICB0aGlzLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRFdmVudHMgPSBmdW5jdGlvbihldmVudHMpIHtcbiAgdGhpcy5sb2coJ2FkZEV2ZW50cycsIHsgZXZlbnRzIH0pO1xuXG4gIGV2ZW50cy5mb3JFYWNoKChfZXZlbnQpID0+IHtcbiAgICB0aGlzLmFkZEV2ZW50KF9ldmVudCk7XG4gIH0pO1xuXG4gIHRoaXMuZ2V0VGFyZ2V0RWxlbWVudHMoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdyZW1vdmVFdmVudEJ5SWQnLCB7IGV2ZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5pZCAhPT0gZXZlbnRJZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRXZlbnRzQnlFbGVtZW50SWQgPSBmdW5jdGlvbihlbGVtZW50SWQpIHtcbiAgdGhpcy5sb2coJ3JlbW92ZUV2ZW50c0J5RWxlbWVudElkJywgeyBlbGVtZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5lbGVtZW50SWQgIT09IGVsZW1lbnRJZCk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2VuYWJsZUV2ZW50JywgeyBfZXZlbnQgfSk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChfZXZlbnQuaWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlQWxsRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdlbmFibGVBbGxFdmVudHMnKTtcbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbmFibGVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdlbmFibGVFdmVudEJ5SWQnKTtcbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50SWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCA9IGZ1bmN0aW9uKGVsZW1lbnRJZCkge1xuICB0aGlzLmxvZygnZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudElkID09PSB4YXBpRXZlbnQuZWxlbWVudElkKSB7XG4gICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT047XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2Rpc2FibGVFdmVudCcsIHsgX2V2ZW50IH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoX2V2ZW50LmlkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlQWxsRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdkaXNhYmxlQWxsRXZlbnRzJyk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc2FibGVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdkaXNhYmxlRXZlbnRCeUlkJywgeyBldmVudElkIH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnRJZCA9PT0geGFwaUV2ZW50LmlkKSB7XG4gICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzYWJsZUVsZW1lbnRzQnlFbGVtZW50SWQgPSBmdW5jdGlvbihlbGVtZW50SWQpIHtcbiAgdGhpcy5sb2coJ2Rpc2FibGVFbGVtZW50c0J5RWxlbWVudElkJywgeyBlbGVtZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50SWQgPT09IHhhcGlFdmVudC5lbGVtZW50SWQpIHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2lzVmFsaWRFdmVudCcsIHsgX2V2ZW50IH0pO1xuICByZXR1cm4geGFwaUV2ZW50VmFsaWRhdG9yLmlzVmFsaWRFdmVudC5jYWxsKHRoaXMsIF9ldmVudCk7XG59O1xuXG5mdW5jdGlvbiBfYnVpbGRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpIHtcbiAgbGV0IGNvbnRleHQ7XG4gIHRoaXMubG9nKCdfYnVpbGRCYXNlU3RhdGVtZW50JywgeyBhY3RvciwgYXV0aG9yaXR5IH0pO1xuXG4gIGNvbnRleHQgPSBfYnVpbGRCYXNlU3RhdGVtZW50Q29udGV4dC5jYWxsKHRoaXMsIGFjdG9yKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5iYXNlU3RhdGVtZW50LCB4QVBJRXZlbnRTdGF0ZW1lbnQsIHsgYWN0b3IsIGNvbnRleHQsIGF1dGhvcml0eSB9KTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZygpIHtcbiAgbGV0IGJhc2VTdGF0ZW1lbnQ7XG4gIHRoaXMubG9nKCdfYnVpbGRCYXNlU3RhdGVtZW50Q29uZmlnJyk7XG5cbiAgYmFzZVN0YXRlbWVudCA9IHRoaXMuYmFzZVN0YXRlbWVudDtcblxuICByZXR1cm4ge1xuICAgIGJhc2VTdGF0ZW1lbnQsXG4gICAgcGxhdGZvcm06IG5hdmlnYXRvciA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiBudWxsLFxuICAgIGxhbmd1YWdlOiBuYXZpZ2F0b3IgPyBuYXZpZ2F0b3IubGFuZ3VhZ2UgOiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIF9idWlsZEJhc2VTdGF0ZW1lbnRDb250ZXh0KGFjdG9yKSB7XG4gIGxldCBpbnN0cnVjdG9yO1xuICB0aGlzLmxvZygnX2dldFN0YXRlbWVudENvbmZpZ1N0cnVjdHVyZScsIHsgYWN0b3IgfSk7XG5cbiAgaW5zdHJ1Y3RvciA9IGFjdG9yIHx8IG51bGw7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHhBUElFdmVudFN0YXRlbWVudENvbnRleHQsIHsgaW5zdHJ1Y3RvciB9KTtcbn1cblxuZnVuY3Rpb24gX2lzRW5hYmxlZCh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ19pc0VuYWJsZWQnLCB4YXBpRXZlbnQuc3RhdHVzKTtcbiAgcmV0dXJuIHhhcGlFdmVudC5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLk9OO1xufVxuIl19
