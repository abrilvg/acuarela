import { nlPOST } from "../Api";

const url = 'users';

export const createUser = (userData) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_USER',
      payload: nlPOST(`${url}`, userData)
    });
  }
}

export const loginUser = (userData) => {
  return dispatch => {
    dispatch({
      type: 'USER_LOGIN',
      payload: nlPOST(`${url}/login`, userData)
    });
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: 'USER_LOGOUT'
    });
  }
}
