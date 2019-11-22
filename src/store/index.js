import Vue from 'vue';
import Vuex from 'vuex';
import map from './map';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    map,
    auth,
  },
});
