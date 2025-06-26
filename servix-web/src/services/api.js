import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ou IP local se for em outro dispositivo
});

export default api;

