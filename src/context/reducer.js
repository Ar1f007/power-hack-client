import alert from '../utils/alert';

const reducer = (state, action) => {
  if (action.type === 'REGISTER_USER_BEGIN') {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === 'REGISTER_USER_SUCCESS') {
    alert('success', 'Account created successfully');
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === 'REGISTER_USER_ERROR') {
    return { ...state, isLoading: false, user: null, token: null };
  }
  if (action.type === 'LOGIN_USER_BEGIN') {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === 'LOGIN_USER_SUCCESS') {
    alert('success', 'Login successful');
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === 'LOGIN_USER_ERROR') {
    return { ...state, isLoading: false, user: null, token: null };
  }

  if (action.type === 'LOGOUT_USER') {
    return { ...state, user: null, token: null };
  }
  return state;
};

export default reducer;
