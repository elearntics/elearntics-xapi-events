import xapiEventStatus from './status';

export default {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: xapiEventStatus.DISABLED,
  isValid: false
};
