import axios from 'axios';
const authAxios = axios.create({
  baseURL: 'http://localhost:8000', 
});

authAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id'); 
    if (token) {

      config.headers['token'] = token; 
      config.headers['user_id'] = user_id;

    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default authAxios;
