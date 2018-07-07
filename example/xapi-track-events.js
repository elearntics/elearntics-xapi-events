var logEvent = function logEvent(_event, xapiEvent) {
  console.log('xAPI Event', _event, xapiEvent);
};

var defaultStatement = xapiEvents.getDefaultStatement();

defaultStatement.actor = 'actor@email.com';
defaultStatement.verb = 'selected';

var events = [{
  id: 'select-text',
  callback: xapiEvents.LRS.send,
  name: 'mouseup',
  elementSelectors: ['.text'],
  isValid: false,
  status: 'OFF',
  statement: [defaultStatement]
}];

xapiEvents.LRS.setConfig({
  USERNAME: 'username',
  PASSWORD: 'password',
  URL: 'http://example.com'
});

xapiEvents.addEvents(events);
xapiEvents.enableAllEvents();
xapiEvents.listenEnabledEvents();
xapiEvents.init('actor@email.com', 'xapiEvents-Example');