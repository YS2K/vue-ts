import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    updataLoding(state: any, obj: any) {
      state.loading = obj;
    },
  },
  actions: {
    setState(context: any, obj: any) {
      context.commit('updataLoding', obj);
    },
  },
  modules: {
  },
});
