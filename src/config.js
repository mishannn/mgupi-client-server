const baseUrl = localStorage.getItem('baseUrl');

export default {
  baseUrl: baseUrl ? baseUrl : 'http://localhost:1717',
};
