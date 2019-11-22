import axios from 'axios';
import config from '../config';

class AuthApi {
  static async signUp(username, password) {
    try {
      const response = await axios.post(`${config.baseUrl}/user/signup`, {
        username: username,
        password: password,
        roles: ['USER'],
      });

      return {
        success: true,
        token: response.data,
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
        error: e.response.data.message,
      };
    }
  }

  static async signIn(username, password) {
    try {
      const response = await axios.post(`${config.baseUrl}/user/signin`, {
        username: username,
        password: password,
      });

      return {
        success: true,
        token: response.data,
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
        error: e.response.data.message,
      };
    }
  }
}

export default AuthApi;
