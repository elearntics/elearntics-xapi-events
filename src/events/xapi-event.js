import { EventStatus } from './event-status';
let xapiEvent;

xapiEvent = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: EventStatus.DISABLED,
  isValid: false,
  statementProperties: [],
};

export { xapiEvent };
