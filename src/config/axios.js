import axios from 'axios';
import { BACKEND_URL } from '../config/env';
import { getAccessToken, removeAccessToken } from '../utils/local-storage';

axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    if (error.response.status === 401) 
    {
      removeAccessToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axios;