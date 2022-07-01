import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import alert from '../utils/alert';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const INITIAL_VALUE = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  savingBill: false,
  bill: {},
  bills: [],
  formBillData: {},
  totalAmount: 0,
  formData: {},
  isEditing: false,
  updated: false,
  numOfPages: 1,
  page: 1,
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

  const saveBill = async (data) => {
    dispatch({ type: 'ADD_BILL_BEGIN', payload: data });

    try {
      const res = await axios.post('/add-billing', data);

      dispatch({ type: 'ADD_BILL_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'ADD_BILL_FAILED', payload: data.amount });
    }
  };

  const updateBill = async (data) => {
    const res = await axios.patch(`/update-billing/${data.id}`, data);
    if (res.status === 200) {
      alert('success', 'Updated successfully');
      dispatch({ type: 'TOGGLE_UPDATE_STATE' });
    }
  };

  const getBills = async (query = '') => {
    let url = `/billing-list?page=${state.page}`;

    if (query) {
      url = url + `&search=${query}`;
    }

    const { data } = await axios(url);

    dispatch({ type: 'GET_BILLS', payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        registerUser,
        loginUser,
        logout,
        saveBill,
        updateBill,
        getBills,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
