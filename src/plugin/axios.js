import axios from 'axios'
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  nProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  nProgress.done()
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance