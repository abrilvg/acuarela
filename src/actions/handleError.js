
import store from '../store';

export const HandleError = (error) => {
  //TODO refactor to support more generic error errors
  if (error.response && error.response.status === 401) {
    //TODO handle a generic notification
    alert('user was loggout out because session has expired');
    store.dispatch({
      type: 'USER_LOGOUT'
    });
  }
}

export default HandleError;
