import {EventStatus} from 'event-status';
var xapiEvent;

xapiEvent = {
  id:         undefined,
  callback:   undefined,
  elementId:  undefined,
  statement:  undefined,
  status:     EventStatus.DISABLED,
  statementProperties: [],
};

export default xapiEvent;
