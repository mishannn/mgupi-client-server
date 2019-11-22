import AuthApi from '../api/AuthApi';

export default {
  namespaced: true,
  state: {
    jwtToken: null,
  },
  actions: {
    async signUp({ commit }, { username, password }) {
      return await AuthApi.signUp(username, password);
    },
    async signIn({ commit }, { username, password }) {
      const result = await AuthApi.signIn(username, password);

      if (result.success) {
        commit('setJwtToken', result.token);
        sessionStorage.setItem('jwtToken', result.token);
      }

      return result;
    },
    signOut({ commit }) {
      commit('setJwtToken', null);
      sessionStorage.removeItem('jwtToken');
    },
    restoreSession({ commit }) {
      const token = sessionStorage.getItem('jwtToken');
      if (token) {
        commit('setJwtToken', token);
      }
    },
  },
  mutations: {
    setJwtToken: (state, payload) => (state.jwtToken = payload),
  },
};
