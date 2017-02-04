import { EventStatus } from './event-status';

const
  IS_FUNCTION = '[object Function]',
  MUST_HAVE_ID = 'Must have an id',
  MUST_HAVE_UNIQUE_ID = 'Must have a unique id',
  MUST_HAVE_STATUS = 'Must have a status',
  MUST_HAVE_STATEMENT_PROPERTIES = 'Must have a statement with the required statement properties',
  MUST_HAVE_CALLBACK = 'Must have a correct callback function',
  NOT_VALID = 'Not valid event:',
  VALID = 'Valid event';

let xapiEventValidator;

xapiEventValidator = {
  isValidEvent(e) {
    this.log('isValidEvent', { e });
    return !_validateEvent.call(this, e).errors.length;
  }
};

export { xapiEventValidator };

/* Private */

function _validateEvent(e) {
  this.log('validateEvent', { e });
  this.errors = [];

  _mustHaveId.call(this, e);
  _mustHaveUniqueId.call(this, e);
  _mustHaveName.call(this, e);
  _mustHaveStatus.call(this, e);
  _mustHaveCallbackFunction.call(this, e);

  this.errors.length ? this.log(NOT_VALID, { e, errors: this.errors }) : this.log(VALID);
  return this;
}

function _mustHaveId(e) {
  this.log('_mustHaveId', { e });

  if (!e.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(e) {
  this.log('_mustHaveUniqueId', { e });

  if (!!this.events.length || !!this.events.filter((xapiEvent) => xapiEvent.id === e.id).length) {
    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }
  return true;
}


function _mustHaveName(e) {
  this.log('_mustHaveName', { e });

  if (!e.name) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveStatus(e) {
  this.log('_mustHaveStatus', { e });

  if (!e.status || !_isValidStatus.call(this, e)) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _isValidStatus(e) {
  this.log('isValidStatus', { e });
  return (
    e.status === EventStatus.ON ||
    e.status === EventStatus.OFF ||
    e.status === EventStatus.DISABLED
  );
}

function _mustHaveStatementWithStatementProperties(e) {
  this.log('_mustHaveStatementWithStatementProperties', { e });

  if (!!e.statementProperties.filter((property) => !e.statement[property]).length) {
    this.errors.push(MUST_HAVE_STATEMENT_PROPERTIES);
    return false;
  }

  return true;
}

function _mustHaveCallbackFunction(e) {
  this.log('_mustHaveCallbackFunction', { e });

  if (!e && Object.prototype.toString.call(e.callback) !== IS_FUNCTION) {
    this.errors.push(MUST_HAVE_CALLBACK);
    return false;
  }

  return true;
}
