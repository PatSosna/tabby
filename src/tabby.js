import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faRedo,
  faTrash,
  faTimes,
  faCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import store from './state';
import App from './components/App';

library.add(
  faRedo,
  faTrash,
  faTimes,
  faCheck,
  faSpinner,
);

Vue.component('fa', FontAwesomeIcon);

// eslint-disable-next-line
new Vue({
  el: '#tabby',
  store,
  components: {
    App,
  },
  render(h) {
    return h('app');
  },
});
