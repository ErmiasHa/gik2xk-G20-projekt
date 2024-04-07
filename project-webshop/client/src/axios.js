import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5001',
});

export default request;
