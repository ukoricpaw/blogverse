import axios, { InternalAxiosRequestConfig } from "axios";

const $public_host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $private_host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
}

$private_host.interceptors.request.use(authInterceptor);

export {
  $private_host,
  $public_host
}
