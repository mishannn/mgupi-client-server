const baseUrl = localStorage.getItem('baseUrl');

export default {
  baseUrl: baseUrl ? baseUrl : 'http://mgupi.rakbot.ru',
};
