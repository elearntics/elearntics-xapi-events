import { EventStatus } from './event-status';
let xapiEvent;

xapiEvent = {
  id: undefined,
  callback: undefined,
  elementId: undefined,
  statement: undefined,
  status: EventStatus.DISABLED,
  isValid: false,
  isEnabled() {
    return status === EventStatus.ON;
  },
  statementProperties: [],
};

export { xapiEvent };
