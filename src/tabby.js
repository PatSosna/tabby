import Vue from 'vue';
import App from './components/app';
import store from './state';

const app = new Vue({
    el: '#tabby',
    store,
    components: {
        App
    },
    render(h) {
        return h('app');
    }
});