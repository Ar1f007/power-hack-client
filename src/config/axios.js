import axios from 'axios';
import alert from '../utils/alert';

// const url = 'http://localhost:5000/api';
const serverURL = 'https://true-hockey-27943.herokuapp.com/api';

const instance = axios.create({
  baseURL: serverURL,
  // baseURL: url,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    const {
      status,
      data: { message },
    } = error.response;

    console.log(error.response);
    switch (status) {
      case 400:
        alert('warning', message || 'Not found');
        break;

      case 401:
        alert('error', `${message}, redirecting to login page` || 'Login to continue');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);

        break;

      case 403:
        alert('error', `${message}, redirecting to login page` || 'Login to continue');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        break;

      case 404:
        alert('error', message || 'Resource not found');
        break;

      case 424:
        alert('error', message || 'Could not perform the task');
        break;

      default:
        alert('error', 'Something went wrong');
    }
  }
);
export default instance;
