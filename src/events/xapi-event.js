import { EventStatus } from './event-status';

export const xapiEvent = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: EventStatus.DISABLED,
  isValid: false
};
