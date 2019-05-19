/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    groups: [],
    infoWindow: {
      show: false,
      type: 'success',
      message: '',
      icon: '',
    },
  },

  mutations: {
    loading(state, show) {
      state.isLoading = show;
    },

    showMessage(state, { message, type, icon }) {
      state.infoWindow.message = message;
      state.infoWindow.type = type;
      state.infoWindow.icon = icon;
      state.infoWindow.show = true;
    },

    hideMessage(state) {
      state.infoWindow.show = false;
    },

    deleteGroup(state, id) {
      state.groups = state.groups.filter(group => group.id !== id);
    },

    addGroup(state, group) {
      state.groups.push(group);
    },

    setGroups(state, groups) {
      state.groups = groups;
    },

    updateGroup(state, { groupId, tabs }) {
      const group = state.groups.find(item => item.id === groupId);
      group.tabs = tabs;
    },
  },
});
