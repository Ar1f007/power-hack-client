import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from '../config/axios';

const INITIAL_VALUE = {
  user: null,
  token: null,
  isLoading: false,
};
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

  const addUserToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  // };

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

  return (
    <AppContext.Provider value={{ ...state, dispatch, registerUser, loginUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
