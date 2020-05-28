import 'codemirror/lib/codemirror.css';
import './styles.css';

import Vue from 'vue';

import Main from './components/main/main.vue';
import Vuetify from './plugins/vuetify';


const Root = Vue.extend({
    render: (h) => h(Main),
    vuetify: Vuetify,
});

new Root().$mount('#app');