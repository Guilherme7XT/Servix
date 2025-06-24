import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.100:3000/api', // Substitua pelo IP local da sua máquina
});

export default api;