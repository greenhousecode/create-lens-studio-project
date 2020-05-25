/* eslint-disable no-param-reassign */
import console from '../console';

export const setTimeout = (func, delay) => {
  const event = script.createEvent('DelayedCallbackEvent');
  event.bind(func);
  event.reset(delay / 1000);
  return event;
};

export const clearTimeout = (timeout) => {
  timeout.enabled = false;
};

export const setInterval = (func, interval) => {
  const event = script.createEvent('DelayedCallbackEvent');

  event.bind(() => {
    if (event.enabled) {
      func();
      event.reset(interval / 1000);
    }
  });

  event.reset(interval / 1000);
  return event;
};

export const clearInterval = (interval) => {
  interval.enabled = false;
};
