
import { logoutUser } from '../actions/userActions';
import store from '../store';
import UserSession from './userSession';


//not authorized
// const errorStatus = {
//   401: (dispatch) => {
//     dispatch({
//       type: 'USER_ERROR'
//     })
//     dispatch({
//       type: 'USER_LOGOUT'
//     });
//   },
//   403: () => {
//     //TODO just testing
//     dispatch({
//       type: 'USER_LOGOUT'
//     });
//   }
// };

function addTodo() {
  return {
    type: 'USER_LOGOUT'
  }
}

export const HandleError = (state, error) => {
  // if (error.status === 401) {
  //   store.dispatch(addTodo());
  // }
  UserSession.deleteUser();
  return state.merge({
    user: {
      data: {},
      isLoggedIn: false
    },
    showMessageError: true,
    messageError: 'You were logged out for xyz reasons, please login again'
  });

}

