var _xapiEvents, events, logEvent;

logEvent = function(_event, xapiEvent) {
  console.log('xAPI Event', _event, xapiEvent);
  console.log('selection', _xapiEvents.helpers.getSelection());
};

events = [{
    id:             'select-text',
    callback:       logEvent,
    name:           'mouseup',
    elementSelectors: ['.english-texts'],
    isValid:        false,
    status:         'OFF',
    statement: [{
      actor:       'elenatorro@email.com',
      verb:        'selected',
      object:      undefined,
      result:      undefined,
      context:     undefined,
      timestamp:   undefined,
      stored:      undefined,
      authority:   undefined,
      version:     undefined,
      attachments: undefined
    }],
  }
];

_xapiEvents = xapiEvents; // FIXME
_xapiEvents.addEvents(events);
_xapiEvents.enableAllEvents();
_xapiEvents.listenEnabledEvents();
_xapiEvents.init('elenatorro@email.com', 'xapiEvents-Example');
