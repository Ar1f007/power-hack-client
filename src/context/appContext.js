import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const INITIAL_VALUE = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
};
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);
  const navigate = useNavigate();

  const addUserToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const registerUser = async (userInfo) => {
    dispatch({ type: 'REGISTER_USER_BEGIN' });

    try {
      const res = await axios.post('/register', userInfo);
      console.log(res);

      const { user, token } = res.data;

      dispatch({ type: 'REGISTER_USER_SUCCESS', payload: { user, token } });
      addUserToLocalStorage(user, token);
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_ERROR' });
    }
  };

  const loginUser = async (userInfo) => {
    dispatch({ type: 'LOGIN_USER_BEGIN' });

    try {
      const res = await axios.post('/login', userInfo);

      console.log(res);

      const { user, token } = res.data;

      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: { user, token } });
      addUserToLocalStorage(user, token);
    } catch (error) {
      dispatch({ type: 'LOGIN_USER_ERROR' });
    }
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT_USER' });

    removeUserFromLocalStorage();
    navigate('/');
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch, registerUser, loginUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
