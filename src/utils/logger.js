import { config } from '../config';

const logger = {
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

export {
  logger
};
