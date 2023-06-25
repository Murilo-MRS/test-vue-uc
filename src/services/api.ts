import axios from 'axios';

export const API_URL = 'http://187.60.56.72:3131';
export const creatorId = 'b4ba9380-370d-453c-8b8e-d7aff611f9c1';
export const creatorName = 'Murilo Santana';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
