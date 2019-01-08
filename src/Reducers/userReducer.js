import Immutable from 'seamless-immutable';
import UserSession from "../UserSession";

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
  error: {},
});

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case 'CREATE_USER_FULFILLED': {
      UserSession.saveUser(action.payload.data);
      return state.merge({
        user: {
          data: action.payload.data.data,
          isLoggedIn: true
        },
        loading: false,
        error: {}
      });
    }

    case 'CREATE_USER_PENDING': {
      return state.merge({
        loading: true,
        error: {}
      });
    }

    case 'CREATE_USER_REJECTED': {
      return state.merge({
        loading: false,
        error: action.payload.response ? action.payload.response : { message: action.payload.message }
      });
    }

    case 'USER_LOGIN_FULFILLED': {
      UserSession.saveUser(action.payload.data);
      return state.merge({
        user: {
          data: action.payload.data.data,
          isLoggedIn: true
        },
        loading: false,
        error: {}
      });
    }

    case 'USER_LOGIN_PENDING': {
      return state.merge({
        loading: true,
        error: {}
      });
    }

    case 'USER_LOGIN_REJECTED': {
      return state.merge({
        loading: false,
        error: action.payload.response ? action.payload.response : { message: action.payload.message }
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
        error: {}
      });
    }

    default:
      return state;
  }
}
