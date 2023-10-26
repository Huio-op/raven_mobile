import axios from 'axios';

const HttpClient = axios.create();

HttpClient.interceptors.request.use((config) => {
  const randomString = Math.random().toString(36).substring(2);
  const timestamp = Date.now();
  config.params = Object.assign({}, config.params || {}, { _: `${timestamp}${randomString}` });
  config.baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;
  return config;
});

export default HttpClient;
