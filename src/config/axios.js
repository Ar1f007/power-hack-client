import axios from 'axios';
import alert from '../utils/alert';

const url = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    const {
      status,
      data: { message },
    } = error.response;

    switch (status) {
      case 400:
        alert('warning', message || 'Not found');
        break;

      case 401 || 403:
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
        alert('error', message || 'Login to continue');
        break;

      case 404:
        alert('error', message || 'Not found');
        break;

      default:
        alert('error', 'Something went wrong');
    }
  }
);
export default instance;
