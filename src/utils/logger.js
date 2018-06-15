import config from '../config';

export default {
  debug: config.debug,

  log(...message) {
    if (!config.debug) { return false; }
    try {
      console.log(...message);
      return true;
    } catch (reason) {
      return false;
    }
  }
};
