import { xAPIEventsConfig } from '../config';

export const logger = {
  debug: xAPIEventsConfig.debug,
  log(...message) {
    if (!xAPIEventsConfig.debug) { return false; }
    try {
      console.log(...message);
      return true;
    } catch (reason) {
      return false;
    }
  }
};
