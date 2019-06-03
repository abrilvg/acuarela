import { notAuthorizedPOST } from '../api';

const url = 'users';

export const createUser = (dispatch, userData) => {
  dispatch({
    type: 'CREATE_USER_START'
  });
  notAuthorizedPOST(`${url}`, userData)
    .then(response => {
      dispatch({
        type: 'CREATE_USER_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('login error', error);
      dispatch({
        type: 'CREATE_USER_REJECTED'
      });
    })
}

export const loginUser = (dispatch, userData) => {
  dispatch({
    type: 'USER_LOGIN_START'
  });
  notAuthorizedPOST(`${url}/login`, userData)
    .then(response => {
      dispatch({
        type: 'USER_LOGIN_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('login error', error);
      dispatch({
        type: 'USER_LOGIN_REJECTED'
      });
    })
}

export const logoutUser = (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT'
  });
}
