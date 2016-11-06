import xAPIEventsConfig from '../config';

var logger;

logger = {
  debug: xAPIEventsConfig.debug,
  log(...message) {
    if (!xAPIEventsConfig.debug) {return false;}
    try {
      console.log(...message);
      return true;
    } catch(reason) {
      return false;
    }
  }
};

export default logger;
