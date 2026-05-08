import axios from 'axios';
const API = axios.create({ baseURL: 'https://health-monitor-production-04fd.up.railway.app/api' });
export const getEndpoints = () => API.get('/endpoints');
export const addEndpoint = (data) => API.post('/endpoints', data);
export const deleteEndpoint = (id) => API.delete(`/endpoints/${id}`);
export const pingEndpoint = (id) => API.post(`/ping/${id}`);
export const getHistory = (id) => API.get(`/ping/history/${id}`);