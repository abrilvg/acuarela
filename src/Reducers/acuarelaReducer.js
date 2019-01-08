import Immutable from 'seamless-immutable';
import UserSession from "../UserSession";

const initalState = Immutable({
  acuarelas: [],
  loading: false,
  error: {},
  acuarela: {}
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

    default:
      return state;
  }
}
