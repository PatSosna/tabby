import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        groups: [
            {id: 1, name: 'Personal'},
            {id: 2, name: 'Adler' },
            {id: 3, name: 'Agilion' },
            {id: 4, name: 'Litea' },
            {id: 5, name: 'ThreatGuard' }
        ]
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
        }
    }
});