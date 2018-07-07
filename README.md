# xapi-events [![Build Status](https://travis-ci.org/elearntics/elearntics-xapi-events.svg?branch=master)](https://travis-ci.org/elearntics/elearntics-xapi-events)

> Manage student interactions in elearning applications using the xAPI specification


## Install

```
$ npm install @elearntics/xapi-events
```

## Usage

### Option 1: Import `xapiEvent` as a module

```js 
import xapiEvents from '@elearntics/xapi-events';
```

### Option 2: Load the script in your HTML

```html
<script src="node_modules/@elearntics/xapi-events/dist/xapi-events.js" type="text/javascript"></script>
```

### Basic example 

```js
const defaultStatement = xapiEvents.getDefaultStatement();

const events = [{
  id: 'select-text',
  callback: xapiEvents.LRS.send,
  name: 'mouseup',
  elementSelectors: ['.text'],
  isValid: false,
  status: 'OFF',
  statement: [...defaultStatement, {
    verb: 'selected',
    actor: 'actor@email.com'
  }]
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
```

## xAPI Event format

### id

A unique identifier.

### callback

The function to be executed when the event is triggered.

### name

The name of the event listener. *(i.e: click, mouseup, mousedown...)*

### elementSelector

The query selector for the HTML elements that will listen to the event.

### targetElement

The array elements that are listening to the event.

### statement

The statement structure that will be used when the event is triggers.

### status

The event status. There are three possible states:

* ON
* OFF
* DISABLED (the initial state)

The event will only be available if its state is `ON`. 

## API

### xapiEvents.init(actor, authority)

Initializes `xapiEvents` by default.

### xapiEvents.reset

Resets `xapiEvents` by default.

### xapiEvents.setBaseStatement(author, authority)

Sets the default statement that is used to build the rest of the statements.

### xapiEvents.listenEnabledEvents

It subscribes to all the events for all the xAPI events that are enabled.

### xapiEvents.stopEnabledEvents

It remove the subscription to all the events for all the xAPI events that are enabled.

### xapiEvents.addEvent(event)

Add a single xAPI Event.

### xapiEvents.addEvents([events])

Add multiple xAPI Events.

### xapiEvents.removeEventById(id)

Remove the first event it founds a given xAPI Event id;

### xapiEvents.enableAllEvents

Set all the xAPI events status to ON.

### xapiEvents.enableEventById

Set an xAPI event status to ON.

### xapiEvents.disableEventById

Set ALL the xAPI events status to OFF.

### xapiEvents.disableEvent

Set an xAPI event status to OFF.

### xapiEvents.getDefaultEvent

Gets the default xAPI event structure.

### xapiEvents.getDefaultStatement

Gets the default statment structure.

### xapiEvents.getTargetElements

Gets all the elements that are listening to the event.

### xapiEvents.isValidEvent

Returns if the event is well-formed.

### LRS

You can set the credentials to connect to your LRS.

#### xapiEvents.LRS.setConfig

* username: your username.
* password: your password.
* url: the url where your LRS is hosted.

```js
xapiEvents.LRS.setConfig({
  USERNAME: 'username',
  PASSWORD: 'password',
  URL: 'http://example.com'
});
```

#### xapiEvents.LRS.send

Post an statement to your LRS. Can be used as a callback for an xapi-event.

## License

MIT © [elearntics](https://elearntics.com)