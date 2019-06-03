import Immutable from 'seamless-immutable';

const initalState = Immutable({
  acuarela: {},
  acuarelas: [],
  loading: false
});

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case 'FETCH_ACUARELAS_START': {
      return state.merge({
        loading: true
      });
    }

    case 'FETCH_ACUARELAS_FULFILLED': {
      return state.merge({
        acuarelas: action.payload.data.data,
        loading: false
      });
    }

    case 'FETCH_ACUARELAS_REJECTED': {
      return state.merge({
        loading: false,
      });
    }

    case 'FETCH_ACUARELAS_BY_USER_START': {
      return state.merge({
        loading: true
      });
    }

    case 'FETCH_ACUARELAS_BY_USER_FULFILLED': {
      return state.merge({
        acuarelas: action.payload.data.data,
        loading: false
      });
    }

    case 'FETCH_ACUARELAS_BY_USER_REJECTED': {
      return state.merge({
        loading: false
      });
    }

    case 'SAVE_ACUARELA_START': {
      return state.merge({
        loading: true
      });
    }

    case 'SAVE_ACUARELA_FULFILLED': {
      return state.merge({
        acuarela: action.payload.data.data,
        acuarelas: [...state.acuarelas, action.payload.data.data],
        loading: false
      });
    }

    case 'SAVE_ACUARELA_REJECTED': {
      return state.merge({
        loading: false
      });
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
      });
    }

    case 'FETCH_ACUARELA_DETAILS_START': {
      return state.merge({
        loading: true
      });
    }

    case 'FETCH_ACUARELA_DETAILS_FULFILLED': {
      return state.merge({
        acuarela: action.payload.data.data,
        loading: false
      });
    }

    case 'FETCH_ACUARELA_DETAILS_REJECTED': {
      return state.merge({
        loading: false,
      });
    }

    default:
      return state;
  }
}
