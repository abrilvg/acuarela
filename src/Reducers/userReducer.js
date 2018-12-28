import Immutable from 'seamless-immutable';

//initial state
const initalState = Immutable({
  user: {
    isLoggedIn: localStorage.getItem('user_token') !== null,
    data: {
      name: localStorage.getItem('user_name')? localStorage.getItem('user_name') : '',
      _id: localStorage.getItem('user_id')? localStorage.getItem('user_id'): ''
    }
  },
  loading: false,
  error: {},
});

export default (state = initalState, action={}) => {
  switch (action.type) {
    case 'CREATE_USER_FULFILLED': {
      if (action.payload.data.token) {
        localStorage.setItem('user_token', action.payload.data.token);
        localStorage.setItem('user_name', action.payload.data.data.name);
        localStorage.setItem('user_id', action.payload.data.data._id);
      }
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
        error: action.payload.response? action.payload.response: { message: action.payload.message}
      });
    }

    case 'USER_LOGIN_FULFILLED': {
      if (action.payload.data.token) {
        localStorage.setItem('user_token', action.payload.data.token);
        localStorage.setItem('user_name', action.payload.data.data.name);
        localStorage.setItem('user_id', action.payload.data.data._id);
      }
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
        error: action.payload.response? action.payload.response: { message: action.payload.message}
      });
    }

    case 'USER_LOGOUT': {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_id');
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
