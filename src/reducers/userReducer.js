import Immutable from 'seamless-immutable';
import UserSession from '../actions/userSession';

let userData = UserSession.getUser();

//initial state
const initalState = Immutable({
  user: {
    isLoggedIn: UserSession.hasToken(),
    data: {
      name: userData.userName,
      _id: userData.id
    }
  },
  loading: false,
  error: false,
});

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case 'CREATE_USER_START': {
      return state.merge({
        loading: true
      });
    }

    case 'CREATE_USER_FULFILLED': {
      UserSession.saveUser(action.payload.data);
      return state.merge({
        user: {
          data: action.payload.data.data,
          isLoggedIn: true
        },
        loading: false
      });
    }

    case 'CREATE_USER_REJECTED': {
      let payload = action.payload;
      return state.merge({
        loading: false,
        error: payload.response ? {
          message: payload.response.data.message,
          status: payload.response.status
        } : {
          message: payload.message
        }
      });
    }

    case 'USER_LOGIN_START': {
      return state.merge({
        loading: true
      });
    }

    case 'USER_LOGIN_FULFILLED': {
      UserSession.saveUser(action.payload.data);
      return state.merge({
        user: {
          data: action.payload.data.data,
          isLoggedIn: true
        },
        loading: false
      });
    }

    case 'USER_LOGIN_REJECTED': {
      let payload = action.payload;
      return state.merge({
        loading: false,
        error: payload.response ? {
          message: payload.response.data.message,
          status: payload.response.status
        } : {
          message: payload.message
        }
      });
    }

    case 'USER_LOGOUT': {
      UserSession.deleteUser();
      return state.merge({
        user: {
          data: {},
          isLoggedIn: false
        },
        loading: false,
        error: false
      });
    }

    default:
      return state;
  }
}
