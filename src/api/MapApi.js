const LOCALSTORAGE_POINTS_KEY = 'points';

class MapApi {
  static getPoints() {
    return new Promise(resolve => {
      let points;
      try {
        points = JSON.parse(localStorage.getItem(LOCALSTORAGE_POINTS_KEY)) || [];
      } catch (e) {
        points = [];
      }

      setTimeout(() => {
        resolve(points);
      }, 500);
    });
  }

  static addPoint(point) {
    return new Promise(resolve => {
      const id = new Date().getTime();

      let points;
      try {
        points = JSON.parse(localStorage.getItem(LOCALSTORAGE_POINTS_KEY)) || [];
      } catch (e) {
        points = [];
      }

      points.push({ id, ...point });
      localStorage.setItem(LOCALSTORAGE_POINTS_KEY, JSON.stringify(points));

      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  }

  static deletePoint(id) {
    return new Promise(resolve => {
      let points;
      try {
        points = JSON.parse(localStorage.getItem(LOCALSTORAGE_POINTS_KEY)) || [];
      } catch (e) {
        points = [];
      }

      const pointIndex = points.findIndex(point => point.id === id);
      if (pointIndex === -1) {
        resolve(false);
        return;
      }

      points.splice(pointIndex, 1);
      localStorage.setItem(LOCALSTORAGE_POINTS_KEY, JSON.stringify(points));

      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
}

export default MapApi;
