import { EventStatus } from './event-status';

const  IS_FUNCTION = '[object Function]';
const  MUST_HAVE_ID = 'Must have an id';
const  MUST_HAVE_UNIQUE_ID = 'Must have a unique id';
const  MUST_HAVE_STATUS = 'Must have a status';
const  MUST_HAVE_CALLBACK = 'Must have a correct callback function';
const  NOT_VALID = 'Not valid event:';
const  VALID = 'Valid event';

export const xapiEventValidator = {
  isValidEvent(e) {
    this.log('isValidEvent', { e });
    return !_hasErrors.call(this, e).errors.length;
  }
};

function _hasErrors(xapiEvent) {
  this.log('validateEvent', { xapiEvent });
  this.errors = [];

  _mustHaveId.call(this, xapiEvent);
  _mustHaveUniqueId.call(this, xapiEvent);
  _mustHaveName.call(this, xapiEvent);
  _mustHaveStatus.call(this, xapiEvent);
  _mustHaveCallbackFunction.call(this, xapiEvent);

  this.errors.length
    ? this.log(NOT_VALID, { event: xapiEvent, errors: this.errors })
    : this.log(VALID);

  return this;
}

function _mustHaveId(xapiEvent) {
  this.log('_mustHaveId', { xapiEvent });

  if (!xapiEvent.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(xapiEvent) {
  this.log('_mustHaveUniqueId', { xapiEvent });
  if (!!this.events.length &&
    !!this.events.filter((xapiEvent) => xapiEvent.id === xapiEvent.id).length) {

    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }

  return true;
}

function _mustHaveName(xapiEvent) {
  this.log('_mustHaveName', { xapiEvent });

  if (!xapiEvent.name) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveStatus(xapiEvent) {
  this.log('_mustHaveStatus', { xapiEvent });

  if (!xapiEvent.status || !_isValidStatus.call(this, xapiEvent)) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _isValidStatus(xapiEvent) {
  this.log('isValidStatus', { xapiEvent });
  return (
    xapiEvent.status === EventStatus.ON ||
    xapiEvent.status === EventStatus.OFF ||
    xapiEvent.status === EventStatus.DISABLED
  );
}

function _mustHaveCallbackFunction(xapiEvent) {
  this.log('_mustHaveCallbackFunction', { xapiEvent });

  if (!xapiEvent &&
    Object.prototype.toString.call(xapiEvent.callback) !== IS_FUNCTION) {
    this.errors.push(MUST_HAVE_CALLBACK);
    return false;
  }

  return true;
}
