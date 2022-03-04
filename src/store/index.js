import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
  },
  getters: {
    isConnected: (state) => {
      return state.isConnected;
    },
  },
  mutations: {
    setConnect(state, status) {
      state.isConnected = status;
    },
  },
  actions: {
    activeConnect: ({ commit }, status) => {
      commit("setConnect", status);
    },
  },
  modules: {},
});
