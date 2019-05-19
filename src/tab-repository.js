/* eslint-disable no-undef */

export default {
  all(query = { currentWindow: true }) {
    return browser.tabs.query(query);
  },
};
