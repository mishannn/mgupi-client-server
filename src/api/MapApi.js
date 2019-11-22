import axios from 'axios';
import config from '../config';

class MapApi {
  static async getPoints(token) {
    try {
      const response = await axios.get(`${config.baseUrl}/point/all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        points: response.data,
      };
    } catch (e) {
      if (!e.response) {
        return {
          success: false,
          error: 'Не удалось подключиться к серверу',
        };
      }

      if (!e.response.data) {
        return {
          success: false,
          error: 'Пришел пустой ответ от сервера',
        };
      }

      return {
        success: false,
        error: 'Не удалось получить точки',
      };
    }
  }

  static async addPoint(point, token) {
    try {
      const response = await axios.post(
        `${config.baseUrl}/point`,
        {
          description: point.desc,
          lat: point.latLng[0],
          lng: point.latLng[1],
          title: point.name,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        success: true,
        point: response.data,
      };
    } catch (e) {
      if (!e.response) {
        return {
          success: false,
          error: 'Не удалось подключиться к серверу',
        };
      }

      if (!e.response.data) {
        return {
          success: false,
          error: 'Пришел пустой ответ от сервера',
        };
      }

      return {
        success: false,
        error: 'Не удалось добавить точку',
      };
    }
  }

  static async deletePoint(id, token) {
    try {
      const response = await axios.delete(`${config.baseUrl}/point/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        point: response.data,
      };
    } catch (e) {
      if (!e.response) {
        return {
          success: false,
          error: 'Не удалось подключиться к серверу',
        };
      }

      if (!e.response.data) {
        return {
          success: false,
          error: 'Пришел пустой ответ от сервера',
        };
      }

      return {
        success: false,
        error: 'Не удалось удалить точку',
      };
    }
  }
}

export default MapApi;
