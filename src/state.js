import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        groups: []
    },
    mutations: {
        enableLoading() {
            this.state.isLoading = true;
        },
        disableLoading() {
            this.state.isLoading = false;
        },
        deleteGroup(state, id) {
            state.groups = state.groups.filter(group => {
                return group.id !== id;
            })
        },
        addGroup(state, group) {
            state.groups.push(group);
        },
        initContent(state, groups) {
            state.groups = groups;
        }
    }
});