import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

// Thêm interceptor để xử lý lỗi global (Tùy chọn)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error('Có lỗi xảy ra khi kết nối API!');
    return Promise.reject(error);
  }
);

export default api;