import xapiEventValidator from 'xapiEventValidator';
import xapiStatements from 'xapiStatements';
import xapiLRSMiddleware from 'xapiLRSMiddleware';

const xapiEventStatus = Object.freeze({
  ON: 'ON',
  OFF: 'OFF',
  DISABLED: 'DISABLED'
});

const xapiEventDefault = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: xapiEventStatus.DISABLED,
  isValid: false
};

export {
  xapiEventDefault,
  xapiEventStatus
};
