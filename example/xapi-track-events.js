var logEvent = function logEvent(_event, xapiEvent) {
  console.log('xAPI Event', _event, xapiEvent);
};

var events = [{
    id:             'select-text',
    callback:       logEvent,
    name:           'mouseup',
    elementSelectors: ['.text'],
    isValid:        false,
    status:         'OFF',
    statement: [{
      actor:       'actor@email.com',
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

xapiEvents.addEvents(events);
xapiEvents.enableAllEvents();
xapiEvents.listenEnabledEvents();
xapiEvents.init('actor@email.com', 'xapiEvents-Example');
