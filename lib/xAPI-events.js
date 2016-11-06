import logger from './utils/logger';
import xAPIEventStatement from './xapi/statement';
import xAPIEventStatementContext from './xapi/statement-context';

import xAPIValidator from '../adlnet/xAPI-Validator-JS/xapiValidator';

var xAPIEvents;

xAPIEvents = {
  log: logger.log,
  statement: null,

  initDefault(actor, authority) {
    this.log('initDefault');

    return this.setDefaultStatement(actor, authority).setStatementConfigInfo();
  },

  isValidStatement() {
    this.log('isValidStatement', this.statement);
    return !xAPIValidator.validateStatement(this.statement).errors.length;
  },

  setDefaultStatement(actor, authority) {
    this.log('setStatementConfig');

    this.statement = !!actor && !!authority ?
      _buildDefaultStatement.call(this, actor, authority)
      : false;

    return this;
  },

  setStatementConfigInfo() {
    this.log('setStatementInfo');

    return this.statement && this.statement.config ?
      (Object.assign(this.statement.config, {
        platform: navigator ? navigator.userAgent: null, // navigator.platform ?, window.location ?
        language: navigator ? navigator.language : null
      }), this)
      : false;
  }
};

export default xAPIEvents;

/* Private */
function _buildDefaultStatement(actor, authority) {
  var context;
  this.log('_buildDefaultStatement', {actor, authority});

  context = _buildDefaultStatementContext.call(this, actor);
  return Object.assign({}, xAPIEventStatement, {actor, context, authority});
}

function _buildDefaultStatementContext(actor) {
  this.log('_getStatementConfigStructure', {actor});
  return Object.assign({}, xAPIEventStatementContext, {instructor: actor || null});
}
