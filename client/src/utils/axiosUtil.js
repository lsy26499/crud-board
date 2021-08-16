import axiosModule from 'axios';
import { REACT_APP_API_SERVER } from '../config';

export const API_URL = `http://${REACT_APP_API_SERVER}/`;

export const axios = axiosModule.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
  timeout: 60 * 5,
});

axios.interceptors.request.use((request) => {
  // console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use((response) => {
  // console.log('Response:', response);
  return response;
});
