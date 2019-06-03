
import store from '../store';

//TODO heck how to handle with internet connection error
//second error shouldnot be neccesary
// const error = payload.response ? {
//   message: payload.response.data.message,
//   status: payload.response.status
// } : {
//   message: payload.message
// };


function logoutUser() {
  return {
    type: 'USER_LOGOUT'
  }
}

export const HandleError = (error) => {
  //refactor
  if (error.response.status === 401) {
    //show a notification error for 5 seconds more or less
    store.dispatch(logoutUser());
  }
}

export default HandleError;
