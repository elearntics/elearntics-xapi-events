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
        targetElement.removeEventListener(xapiEvent.name, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmpzIiwic3JjL2V2ZW50cy9ldmVudC1zdGF0dXMuanMiLCJzcmMvZXZlbnRzL3hhcGktZXZlbnQtdmFsaWRhdG9yLmpzIiwic3JjL2V2ZW50cy94YXBpLWV2ZW50LmpzIiwic3JjL2V2ZW50cy94YXBpLWhlbHBlcnMuanMiLCJzcmMvc3RhdGVtZW50cy9jb250ZXh0LmpzIiwic3JjL3N0YXRlbWVudHMvc3RydWN0dXJlLmpzIiwic3JjL3V0aWxzL2xvZ2dlci5qcyIsInNyYy94YXBpRXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBTyxJQUFNO1NBQU4sQUFBeUIsQUFDdkI7QUFEdUIsQUFDOUI7Ozs7Ozs7O0FDREssSUFBTSwyQ0FBYyxBQUFPO01BQU8sQUFDbkMsQUFDSjtPQUZ1QyxBQUVsQyxBQUNMO1lBSEssQUFBb0IsQUFBYyxBQUc3QjtBQUg2QixBQUN2QyxDQUR5Qjs7Ozs7Ozs7OztBQ0EzQjs7QUFFQSxJQUFPLGNBQVAsQUFBcUI7QUFDckIsSUFBTyxlQUFQLEFBQXNCO0FBQ3RCLElBQU8sc0JBQVAsQUFBNkI7QUFDN0IsSUFBTyxtQkFBUCxBQUEwQjtBQUMxQixJQUFPLHFCQUFQLEFBQTRCO0FBQzVCLElBQU8sWUFBUCxBQUFtQjtBQUNuQixJQUFPLFFBQVAsQUFBZTs7QUFFUixJQUFNO0FBQXFCLHNDQUFBLEFBQ25CLEdBQUcsQUFDZDtTQUFBLEFBQUssSUFBTCxBQUFTLGdCQUFnQixFQUFFLEdBQTNCLEFBQXlCLEFBQ3pCO1dBQU8sQ0FBQyxXQUFBLEFBQVcsS0FBWCxBQUFnQixNQUFoQixBQUFzQixHQUF0QixBQUF5QixPQUFqQyxBQUF3QyxBQUN6QztBQUpJLEFBQTJCO0FBQUEsQUFDaEM7O0FBTUYsU0FBQSxBQUFTLFdBQVQsQUFBb0IsV0FBVyxBQUM3QjtPQUFBLEFBQUssSUFBTCxBQUFTLGlCQUFpQixFQUFF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LEFBRXpDOztlQUFhLFNBQWIsQUFBc0IsQUFDdEI7U0FBTyxPQUFBLEFBQU8sMkNBQWtDLEVBQUUsWUFBbEQsQUFBTyxBQUF5QyxBQUNqRDs7O0FBRUQsU0FBQSxBQUFTLFdBQVQsQUFBb0IsV0FBVyxBQUM3QjtPQUFBLEFBQUssSUFBTCxBQUFTLGNBQWMsVUFBdkIsQUFBaUMsQUFDakM7U0FBTyxVQUFBLEFBQVUsV0FBVyx5QkFBNUIsQUFBd0MsQUFDekMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IHhBUElFdmVudHNDb25maWcgPSB7XG4gIGRlYnVnOiBmYWxzZVxufTtcbiIsImV4cG9ydCBjb25zdCBFdmVudFN0YXR1cyA9IE9iamVjdC5mcmVlemUoe1xuICBPTjogJ09OJyxcbiAgT0ZGOiAnT0ZGJyxcbiAgRElTQUJMRUQ6ICdESVNBQkxFRCdcbn0pO1xuIiwiaW1wb3J0IHsgRXZlbnRTdGF0dXMgfSBmcm9tICcuL2V2ZW50LXN0YXR1cyc7XG5cbmNvbnN0ICBJU19GVU5DVElPTiA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5jb25zdCAgTVVTVF9IQVZFX0lEID0gJ011c3QgaGF2ZSBhbiBpZCc7XG5jb25zdCAgTVVTVF9IQVZFX1VOSVFVRV9JRCA9ICdNdXN0IGhhdmUgYSB1bmlxdWUgaWQnO1xuY29uc3QgIE1VU1RfSEFWRV9TVEFUVVMgPSAnTXVzdCBoYXZlIGEgc3RhdHVzJztcbmNvbnN0ICBNVVNUX0hBVkVfQ0FMTEJBQ0sgPSAnTXVzdCBoYXZlIGEgY29ycmVjdCBjYWxsYmFjayBmdW5jdGlvbic7XG5jb25zdCAgTk9UX1ZBTElEID0gJ05vdCB2YWxpZCBldmVudDonO1xuY29uc3QgIFZBTElEID0gJ1ZhbGlkIGV2ZW50JztcblxuZXhwb3J0IGNvbnN0IHhhcGlFdmVudFZhbGlkYXRvciA9IHtcbiAgaXNWYWxpZEV2ZW50KGUpIHtcbiAgICB0aGlzLmxvZygnaXNWYWxpZEV2ZW50JywgeyBlIH0pO1xuICAgIHJldHVybiAhX2hhc0Vycm9ycy5jYWxsKHRoaXMsIGUpLmVycm9ycy5sZW5ndGg7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9oYXNFcnJvcnMoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCd2YWxpZGF0ZUV2ZW50JywgeyB4YXBpRXZlbnQgfSk7XG4gIHRoaXMuZXJyb3JzID0gW107XG5cbiAgX211c3RIYXZlSWQuY2FsbCh0aGlzLCB4YXBpRXZlbnQpO1xuICBfbXVzdEhhdmVVbmlxdWVJZC5jYWxsKHRoaXMsIHhhcGlFdmVudCk7XG4gIF9tdXN0SGF2ZU5hbWUuY2FsbCh0aGlzLCB4YXBpRXZlbnQpO1xuICBfbXVzdEhhdmVTdGF0dXMuY2FsbCh0aGlzLCB4YXBpRXZlbnQpO1xuICBfbXVzdEhhdmVDYWxsYmFja0Z1bmN0aW9uLmNhbGwodGhpcywgeGFwaUV2ZW50KTtcblxuICB0aGlzLmVycm9ycy5sZW5ndGhcbiAgICA/IHRoaXMubG9nKE5PVF9WQUxJRCwgeyBldmVudDogeGFwaUV2ZW50LCBlcnJvcnM6IHRoaXMuZXJyb3JzIH0pXG4gICAgOiB0aGlzLmxvZyhWQUxJRCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZUlkKHhhcGlFdmVudCkge1xuICB0aGlzLmxvZygnX211c3RIYXZlSWQnLCB7IHhhcGlFdmVudCB9KTtcblxuICBpZiAoIXhhcGlFdmVudC5pZCkge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0lEKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlVW5pcXVlSWQoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVVbmlxdWVJZCcsIHsgeGFwaUV2ZW50IH0pO1xuICBpZiAoISF0aGlzLmV2ZW50cy5sZW5ndGggJiZcbiAgICAhIXRoaXMuZXZlbnRzLmZpbHRlcigoeGFwaUV2ZW50KSA9PiB4YXBpRXZlbnQuaWQgPT09IHhhcGlFdmVudC5pZCkubGVuZ3RoKSB7XG5cbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9VTklRVUVfSUQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBfbXVzdEhhdmVOYW1lKHhhcGlFdmVudCkge1xuICB0aGlzLmxvZygnX211c3RIYXZlTmFtZScsIHsgeGFwaUV2ZW50IH0pO1xuXG4gIGlmICgheGFwaUV2ZW50Lm5hbWUpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9JRCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZVN0YXR1cyh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVN0YXR1cycsIHsgeGFwaUV2ZW50IH0pO1xuXG4gIGlmICgheGFwaUV2ZW50LnN0YXR1cyB8fCAhX2lzVmFsaWRTdGF0dXMuY2FsbCh0aGlzLCB4YXBpRXZlbnQpKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfU1RBVFVTKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2lzVmFsaWRTdGF0dXMoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdpc1ZhbGlkU3RhdHVzJywgeyB4YXBpRXZlbnQgfSk7XG4gIHJldHVybiAoXG4gICAgeGFwaUV2ZW50LnN0YXR1cyA9PT0gRXZlbnRTdGF0dXMuT04gfHxcbiAgICB4YXBpRXZlbnQuc3RhdHVzID09PSBFdmVudFN0YXR1cy5PRkYgfHxcbiAgICB4YXBpRXZlbnQuc3RhdHVzID09PSBFdmVudFN0YXR1cy5ESVNBQkxFRFxuICApO1xufVxuXG5mdW5jdGlvbiBfbXVzdEhhdmVDYWxsYmFja0Z1bmN0aW9uKHhhcGlFdmVudCkge1xuICB0aGlzLmxvZygnX211c3RIYXZlQ2FsbGJhY2tGdW5jdGlvbicsIHsgeGFwaUV2ZW50IH0pO1xuXG4gIGlmICgheGFwaUV2ZW50ICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhhcGlFdmVudC5jYWxsYmFjaykgIT09IElTX0ZVTkNUSU9OKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfQ0FMTEJBQ0spO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHsgRXZlbnRTdGF0dXMgfSBmcm9tICcuL2V2ZW50LXN0YXR1cyc7XG5cbmV4cG9ydCBjb25zdCB4YXBpRXZlbnQgPSB7XG4gIGlkOiB1bmRlZmluZWQsXG4gIGNhbGxiYWNrOiB1bmRlZmluZWQsXG4gIG5hbWU6IHVuZGVmaW5lZCxcbiAgZWxlbWVudFNlbGVjdG9yczogW10sXG4gIHRhcmdldEVsZW1lbnRzOiBbXSxcbiAgc3RhdGVtZW50OiB1bmRlZmluZWQsXG4gIHN0YXR1czogRXZlbnRTdGF0dXMuRElTQUJMRUQsXG4gIGlzVmFsaWQ6IGZhbHNlXG59O1xuIiwiZXhwb3J0IGNvbnN0IHhhcGlIZWxwZXJzID0ge1xuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHhBUElFdmVudFN0YXRlbWVudENvbnRleHQgPSB7XG4gIHJlZ2lzdHJhdGlvbjogdW5kZWZpbmVkLFxuICBpbnN0cnVjdG9yOiB1bmRlZmluZWQsXG4gIHRlYW06IHVuZGVmaW5lZCxcbiAgY29udGV4dEFjdGl2aXRpZXM6IHVuZGVmaW5lZCxcbiAgcmV2aXNpb246IHVuZGVmaW5lZCxcbiAgcGxhdGZvcm06IHVuZGVmaW5lZCxcbiAgbGFuZ3VhZ2U6IHVuZGVmaW5lZCxcbiAgc3RhdGVtZW50OiB1bmRlZmluZWQsXG4gIGV4dGVuc2lvbnM6IHVuZGVmaW5lZFxufTtcbiIsImV4cG9ydCBjb25zdCB4QVBJRXZlbnRTdGF0ZW1lbnQgPSB7XG4gIGFjdG9yOiB1bmRlZmluZWQsXG4gIHZlcmI6IHVuZGVmaW5lZCxcbiAgb2JqZWN0OiB1bmRlZmluZWQsXG4gIHJlc3VsdDogdW5kZWZpbmVkLFxuICBjb250ZXh0OiB1bmRlZmluZWQsXG4gIHRpbWVzdGFtcDogdW5kZWZpbmVkLFxuICBzdG9yZWQ6IHVuZGVmaW5lZCxcbiAgYXV0aG9yaXR5OiB1bmRlZmluZWQsXG4gIHZlcnNpb246IHVuZGVmaW5lZCxcbiAgYXR0YWNobWVudHM6IHVuZGVmaW5lZFxufTtcbiIsImltcG9ydCB7IHhBUElFdmVudHNDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1ZzogeEFQSUV2ZW50c0NvbmZpZy5kZWJ1ZyxcbiAgbG9nKC4uLm1lc3NhZ2UpIHtcbiAgICBpZiAoIXhBUElFdmVudHNDb25maWcuZGVidWcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKC4uLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAocmVhc29uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi91dGlscy9sb2dnZXInO1xuXG5pbXBvcnQgeyB4QVBJRXZlbnRTdGF0ZW1lbnQgfSBmcm9tICcuL3N0YXRlbWVudHMvc3RydWN0dXJlJztcbmltcG9ydCB7IHhBUElFdmVudFN0YXRlbWVudENvbnRleHQgfSBmcm9tICcuL3N0YXRlbWVudHMvY29udGV4dCc7XG5cbmltcG9ydCB7IEV2ZW50U3RhdHVzIH0gZnJvbSAnLi9ldmVudHMvZXZlbnQtc3RhdHVzJztcbmltcG9ydCB7IHhhcGlFdmVudFZhbGlkYXRvciB9IGZyb20gJy4vZXZlbnRzL3hhcGktZXZlbnQtdmFsaWRhdG9yJztcbmltcG9ydCB7IHhhcGlFdmVudCB9IGZyb20gJy4vZXZlbnRzL3hhcGktZXZlbnQnO1xuaW1wb3J0IHsgeGFwaUhlbHBlcnMgfSBmcm9tICcuL2V2ZW50cy94YXBpLWhlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgbG9nID0gbG9nZ2VyLmxvZztcbmV4cG9ydCBjb25zdCBiYXNlU3RhdGVtZW50ID0ge307XG5leHBvcnQgY29uc3QgZXZlbnRzID0gW107XG5leHBvcnQgY29uc3QgZXJyb3JzID0gW107XG5leHBvcnQgY29uc3QgdGFyZ2V0RWxlbWVudHMgPSBbXTtcbmV4cG9ydCBjb25zdCBMUlMgPSB7fTtcbmV4cG9ydCBjb25zdCBoZWxwZXJzID0geGFwaUhlbHBlcnM7XG5cbmV4cG9ydCBjb25zdCBpbml0ID0gZnVuY3Rpb24oYWN0b3IsIGF1dGhvcml0eSkge1xuICB0aGlzLmxvZygnaW5pdCcpO1xuICByZXR1cm4gdGhpcy5zZXRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdyZXNldCcpO1xuICByZXR1cm4gdGhpcy5zZXRCYXNlU3RhdGVtZW50KHRoaXMuYmFzZVN0YXRlbWVudC5hdXRob3IsIHRoaXMuYmFzZVN0YXRlbWVudC5hdXRob3JpdHkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRhcmdldEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdnZXRUYXJnZXRFbGVtZW50cycpO1xuXG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIHhhcGlFdmVudC5lbGVtZW50U2VsZWN0b3JzLmZvckVhY2goKGVsZW1lbnRTZWxlY3RvcikgPT4ge1xuICAgICAgdGhpcy5sb2coJ2VsZW1lbnRTZWxlY3RvcicsIGVsZW1lbnRTZWxlY3Rvcik7XG4gICAgICBsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRTZWxlY3Rvcik7XG5cbiAgICAgIGlmIChlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nKCdlbGVtZW50cycsIGVsZW1lbnQpO1xuICAgICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJhc2VTdGF0ZW1lbnQgPSBmdW5jdGlvbihhY3RvciwgYXV0aG9yaXR5KSB7XG4gIHRoaXMubG9nKCdzZXRCYXNlU3RhdGVtZW50Jyk7XG5cbiAgcmV0dXJuICEhYWN0b3IgJiYgISFhdXRob3JpdHkgP1xuICAgIF9idWlsZEJhc2VTdGF0ZW1lbnQuY2FsbCh0aGlzLCBhY3RvciwgYXV0aG9yaXR5KSA6XG4gICAgZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0U3RhdGVtZW50Q29uZmlnSW5mbyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZygnc2V0U3RhdGVtZW50Q29uZmlnSW5mbycpO1xuXG4gIHJldHVybiB0aGlzLmJhc2VTdGF0ZW1lbnQgP1xuICAgIF9idWlsZEJhc2VTdGF0ZW1lbnRDb25maWcuY2FsbCh0aGlzKSA6XG4gICAgZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgbGlzdGVuRW5hYmxlZEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZygnbGlzdGVuRW5hYmxlZEV2ZW50cycpO1xuXG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIHRoaXMubG9nKCd4YXBpRXZlbnQnLCB4YXBpRXZlbnQpO1xuICAgIGlmIChfaXNFbmFibGVkLmNhbGwodGhpcywgeGFwaUV2ZW50KSkge1xuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHhhcGlFdmVudC5lbGVtZW50U2VsZWN0b3JzKTtcblxuICAgICAgdGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgodGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMubG9nKCd0YXJnZXRFbGVtZW50JywgdGFyZ2V0RWxlbWVudCk7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHhhcGlFdmVudC5uYW1lLCAoX2V2ZW50KSA9PiB7XG4gICAgICAgICAgICB4YXBpRXZlbnQuY2FsbGJhY2suY2FsbCh0aGlzLCBfZXZlbnQsIHhhcGlFdmVudCk7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN0b3BFbmFibGVkRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdzdG9wRW5hYmxlZEV2ZW50cycpO1xuXG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChfaXNFbmFibGVkLmNhbGwodGhpcywgeGFwaUV2ZW50KSkge1xuICAgICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKCh0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih4YXBpRXZlbnQubmFtZSwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnRPYmopIHtcbiAgdGhpcy5sb2coJ2FkZEV2ZW50JywgeyBldmVudE9iaiB9KTtcblxuICBpZiAodGhpcy5pc1ZhbGlkRXZlbnQoZXZlbnRPYmopKSB7XG4gICAgY29uc3QgZXZlbnQgPSBPYmplY3QuYXNzaWduKHt9LCB4YXBpRXZlbnQsIGV2ZW50T2JqKTtcbiAgICB0aGlzLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRFdmVudHMgPSBmdW5jdGlvbihldmVudHMpIHtcbiAgdGhpcy5sb2coJ2FkZEV2ZW50cycsIHsgZXZlbnRzIH0pO1xuXG4gIGV2ZW50cy5mb3JFYWNoKChfZXZlbnQpID0+IHtcbiAgICB0aGlzLmFkZEV2ZW50KF9ldmVudCk7XG4gIH0pO1xuXG4gIHRoaXMuZ2V0VGFyZ2V0RWxlbWVudHMoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdyZW1vdmVFdmVudEJ5SWQnLCB7IGV2ZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5pZCAhPT0gZXZlbnRJZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRXZlbnRzQnlFbGVtZW50SWQgPSBmdW5jdGlvbihlbGVtZW50SWQpIHtcbiAgdGhpcy5sb2coJ3JlbW92ZUV2ZW50c0J5RWxlbWVudElkJywgeyBlbGVtZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5lbGVtZW50SWQgIT09IGVsZW1lbnRJZCk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2VuYWJsZUV2ZW50JywgeyBfZXZlbnQgfSk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChfZXZlbnQuaWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlQWxsRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdlbmFibGVBbGxFdmVudHMnKTtcbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbmFibGVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdlbmFibGVFdmVudEJ5SWQnKTtcbiAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50SWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCA9IGZ1bmN0aW9uKGVsZW1lbnRJZCkge1xuICB0aGlzLmxvZygnZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudElkID09PSB4YXBpRXZlbnQuZWxlbWVudElkKSB7XG4gICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT047XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2Rpc2FibGVFdmVudCcsIHsgX2V2ZW50IH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoX2V2ZW50LmlkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlQWxsRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdkaXNhYmxlQWxsRXZlbnRzJyk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc2FibGVFdmVudEJ5SWQgPSBmdW5jdGlvbihldmVudElkKSB7XG4gIHRoaXMubG9nKCdkaXNhYmxlRXZlbnRCeUlkJywgeyBldmVudElkIH0pO1xuICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnRJZCA9PT0geGFwaUV2ZW50LmlkKSB7XG4gICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzYWJsZUVsZW1lbnRzQnlFbGVtZW50SWQgPSBmdW5jdGlvbihlbGVtZW50SWQpIHtcbiAgdGhpcy5sb2coJ2Rpc2FibGVFbGVtZW50c0J5RWxlbWVudElkJywgeyBlbGVtZW50SWQgfSk7XG4gIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50SWQgPT09IHhhcGlFdmVudC5lbGVtZW50SWQpIHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PRkY7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkRXZlbnQgPSBmdW5jdGlvbihfZXZlbnQpIHtcbiAgdGhpcy5sb2coJ2lzVmFsaWRFdmVudCcsIHsgX2V2ZW50IH0pO1xuICByZXR1cm4geGFwaUV2ZW50VmFsaWRhdG9yLmlzVmFsaWRFdmVudC5jYWxsKHRoaXMsIF9ldmVudCk7XG59O1xuXG5mdW5jdGlvbiBfYnVpbGRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpIHtcbiAgbGV0IGNvbnRleHQ7XG4gIHRoaXMubG9nKCdfYnVpbGRCYXNlU3RhdGVtZW50JywgeyBhY3RvciwgYXV0aG9yaXR5IH0pO1xuXG4gIGNvbnRleHQgPSBfYnVpbGRCYXNlU3RhdGVtZW50Q29udGV4dC5jYWxsKHRoaXMsIGFjdG9yKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5iYXNlU3RhdGVtZW50LCB4QVBJRXZlbnRTdGF0ZW1lbnQsIHsgYWN0b3IsIGNvbnRleHQsIGF1dGhvcml0eSB9KTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZygpIHtcbiAgbGV0IGJhc2VTdGF0ZW1lbnQ7XG4gIHRoaXMubG9nKCdfYnVpbGRCYXNlU3RhdGVtZW50Q29uZmlnJyk7XG5cbiAgYmFzZVN0YXRlbWVudCA9IHRoaXMuYmFzZVN0YXRlbWVudDtcblxuICByZXR1cm4ge1xuICAgIGJhc2VTdGF0ZW1lbnQsXG4gICAgcGxhdGZvcm06IG5hdmlnYXRvciA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiBudWxsLFxuICAgIGxhbmd1YWdlOiBuYXZpZ2F0b3IgPyBuYXZpZ2F0b3IubGFuZ3VhZ2UgOiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIF9idWlsZEJhc2VTdGF0ZW1lbnRDb250ZXh0KGFjdG9yKSB7XG4gIGxldCBpbnN0cnVjdG9yO1xuICB0aGlzLmxvZygnX2dldFN0YXRlbWVudENvbmZpZ1N0cnVjdHVyZScsIHsgYWN0b3IgfSk7XG5cbiAgaW5zdHJ1Y3RvciA9IGFjdG9yIHx8IG51bGw7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHhBUElFdmVudFN0YXRlbWVudENvbnRleHQsIHsgaW5zdHJ1Y3RvciB9KTtcbn1cblxuZnVuY3Rpb24gX2lzRW5hYmxlZCh4YXBpRXZlbnQpIHtcbiAgdGhpcy5sb2coJ19pc0VuYWJsZWQnLCB4YXBpRXZlbnQuc3RhdHVzKTtcbiAgcmV0dXJuIHhhcGlFdmVudC5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLk9OO1xufVxuIl19
