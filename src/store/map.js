import MapApi from '../api/MapApi';

export default {
  namespaced: true,
  state: {
    points: [],
  },
  actions: {
    async loadPoints({ commit }, { token }) {
      const result = await MapApi.getPoints(token);

      if (result.success) {
        commit(
          'setPoints',
          result.points.map(point => ({
            id: point.id,
            my: point.my,
            name: point.title,
            desc: point.description,
            latLng: [point.lat, point.lng],
          })),
        );
      }

      return result;
    },
    async addPoint({ state, commit }, { point, token }) {
      const result = await MapApi.addPoint(point, token);
      if (result.success) {
        commit('setPoints', [...state.points, { id: result.point.id, my: true, ...point }]);
      }
      return result;
    },
    async deletePoint({ state, commit }, { id, token }) {
      const result = await MapApi.deletePoint(id, token);
      if (result) {
        commit(
          'setPoints',
          state.points.filter(point => point.id !== id),
        );
      }
      return result;
    },
  },
  mutations: {
    setPoints: (state, payload) => (state.points = payload),
  },
};
