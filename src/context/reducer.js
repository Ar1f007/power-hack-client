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

  if (action.type === 'ADD_BILL_BEGIN') {
    return {
      ...state,
      savingBill: true,
      formBillData: action.payload,
      totalAmount: state.totalAmount + action.payload.amount,
    };
  }
  if (action.type === 'ADD_BILL_SUCCESS') {
    return {
      ...state,
      savingBill: false,
      bill: action.payload,
      bills: [action.payload, ...state.bills],
    };
  }
  if (action.type === 'ADD_BILL_FAILED') {
    return {
      ...state,
      savingBill: false,
      totalAmount: state.totalAmount - action.payload.amount,
    };
  }

  if (action.type === 'SET_TOTAL') {
    return {
      ...state,
      totalAmount: action.payload,
    };
  }

  if (action.type === 'SET_BILLS') {
    return {
      ...state,
      bills: action.payload.bills,
      totalAmount: action.payload.bills.reduce((acc, curr) => {
        acc = acc + curr.amount;
        return acc;
      }, 0),
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === 'EDIT_BILL') {
    return {
      ...state,
      formData: action.payload,
      isEditing: true,
    };
  }

  if (action.type === 'TOGGLE_UPDATE_STATE') {
    return {
      ...state,
      formData: {},
      isEditing: false,
      updated: !state.updated,
    };
  }

  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      page: action.payload,
    };
  }
  if (action.type === 'GET_BILLS') {
    return {
      ...state,
      bills: action.payload.bills,
      numOfPages: action.payload.numOfPages,
    };
  }
  return state;
};

export default reducer;
