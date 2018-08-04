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
            message: ''
        }
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
        },
        flashMessage(state, { message, type }) {
            state.infoWindow.type = type;
            state.infoWindow.message = message;
            state.infoWindow.show = true;

            // Todo: Extract to own InfoWindow object. It does not belong to the state
            setTimeout(() => { state.infoWindow.show = false }, 2000);
        }
    }
});