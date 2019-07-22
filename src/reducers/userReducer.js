import Immutable from 'seamless-immutable';
import UserSession from '../actions/userSession/userSession';

const userData = UserSession.getUser();

//initial state
const initalState = Immutable({
  user: {
    isLoggedIn: UserSession.hasToken(),
    data: {
      name: userData.userName,
      _id: userData.id
    }
  },
  loading: false
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
      return state.merge({
        loading: false
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
      return state.merge({
        loading: false
      });
    }

    case 'USER_LOGOUT': {
      UserSession.deleteUser();
      return state.merge({
        user: {
          data: {},
          isLoggedIn: false
        },
        loading: false
      });
    }

    default:
      return state;
  }
}
