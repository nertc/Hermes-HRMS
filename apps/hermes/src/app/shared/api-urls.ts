const BASE_URL = 'http://localhost:3333/api/';

const API_URLS = Object.freeze({
  login: BASE_URL + 'login',
  logout: BASE_URL + 'logout',
  employee: BASE_URL + 'employee',
  leave: BASE_URL + 'leave',
});

export { API_URLS };
