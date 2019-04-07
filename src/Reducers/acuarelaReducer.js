import Immutable from 'seamless-immutable';
import UserSession from "../UserSession";

const initalState = Immutable({
  acuarela: {},
  acuarelas: [],
  error: {},
  loading: false
});

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case 'FETCH_ACUARELAS_FULFILLED': {
      UserSession.setToken(action.payload.data.token); //should we trust token will always arrive?
      return state.merge({
        acuarelas: action.payload.data.data,
        loading: false,
        error: {}
      });
    }

    case 'FETCH_ACUARELAS_PENDING': {
      return state.merge({
        loading: true,
        error: {}
      });
    }

    case 'FETCH_ACUARELAS_REJECTED': {
      let payload = action.payload;
      return state.merge({
        loading: false,
        error: payload.response ? payload.response : { message: payload.message }
      });
    }

    case 'SAVE_ACUARELA_PENDING': {
      return state.merge({
        loading: true
      });
    }

    case 'SAVE_ACUARELA_FULFILLED': {
      UserSession.setToken(action.payload.data.token);
      return state.merge({
        acuarela: action.payload.data.data,
        acuarelas: [...state.acuarelas, action.payload.data.data],
        error: {},
        loading: false
      });
    }

    case 'SAVE_ACUARELA_REJECTED': {
      const errors = { global: 'error' };
      return state.merge({
        error: errors,
        loading: false
      });
    }

    case 'CLEAN_ACUARELAS': {
      return initalState;
    }

    case 'LOADING_ACUARELA_STARTS': {
      return state.merge({
        loading: true
      });
    }

    case 'LOADING_ACUARELA_SUCCESS': {
      return state.merge({
        loading: false
      });
    }

    case 'LOADING_ACUARELA_ERROR': {
      return state.merge({
        loading: false,
        error: action.error
      });
    }

    default:
      return state;
  }
}
