import logger from '../utils/logger';

const
  IS_FUNCTION                    = '[object Function]',
  MUST_HAVE_ID                   = 'Must have an id',
  MUST_HAVE_UNIQUE_ID            = 'Must have a unique id',
  MUST_HAVE_STATUS               = 'Must have a status',
  MUST_HAVE_STATEMENT_PROPERTIES = 'Must have a statement with the required statement properties',
  MUST_HAVE_CALLBACK             = 'Must have a correct callback function'
;

var xapiEventValidator;

xapiEventValidator = {
  log: logger.log,
  errors: [],

  validateEvent(e) {
    this.log('validateEvent', {e});
    this.errors = [];

    _mustHaveId.call(this, e);
    _mustHaveUniqueId.call(this, e);
    _mustHaveStatus.call(this, e);
    _mustHaveStatementWithStatementProperties.call(this, e);
    _mustHaveCallbackFunction.call(this, e);
    return this;
  },

  isValidEvent(e) {
    this.log('isValidEvent', {e});
    return !!this.validateEvent(e).errors.length;
  }
};

export {xapiEventValidator};

/* Private */
function _mustHaveId(e) {
  this.log('_mustHaveId', {e});

  if (!e.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(events, e) {
  this.log('_mustHaveUniqueId', {events, e});

  if (!!events.filter((xapiEvent) => xapiEvent.id === e.id).length) {
    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }
  return true;
}

function _mustHaveStatus(e) {
  this.log('_mustHaveStatus', {e});

  if (!e.id) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _mustHaveStatementWithStatementProperties(e) {
  this.log('_mustHaveStatementWithStatementProperties', {e});

  if (!!e.statementProperties.filter((property) => !e.statement[property]).length) {
    this.errors.push(MUST_HAVE_STATEMENT_PROPERTIES);
    return false;
  }

  return true;
}

function _mustHaveCallbackFunction(e) {
  this.log('_mustHaveCallbackFunction', {e});

  if (!!e && e.toString().call(e.callback) === IS_FUNCTION) {
    this.errors.push(MUST_HAVE_CALLBACK);
    return false;
  }

  return true;
}
