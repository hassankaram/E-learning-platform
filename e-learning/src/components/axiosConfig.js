// axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem('token');
console.log('Token retrieved in axiosConfig:', token); // Debugging log

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default axiosInstance;