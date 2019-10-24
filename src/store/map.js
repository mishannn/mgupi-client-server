import MapApi from '../api/MapApi';

export default {
  namespaced: true,
  state: {
    points: [],
  },
  actions: {
    async loadPoints({ commit }) {
      const points = await MapApi.getPoints();
      commit('setPoints', points);
    },
    async addPoint({ state, commit }, { point }) {
      const id = await MapApi.addPoint(point);
      if (id) {
        commit('setPoints', [...state.points, { id, ...point }]);
      }
      return id;
    },
    async deletePoint({ state, commit }, { id }) {
      const result = await MapApi.deletePoint(id);
      if (result) {
        commit('setPoints', state.points.filter(point => point.id !== id));
      }
      return result;
    },
  },
  mutations: {
    setPoints: (state, payload) => (state.points = payload),
  },
};
