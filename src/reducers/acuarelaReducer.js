import Immutable from 'seamless-immutable';
import { HandleError } from '../actions/errorHandler';
import { StatisticLabel } from 'semantic-ui-react';

const initalState = Immutable({
  acuarela: {},
  acuarelas: [],
  error: false,
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
      const payload = action.payload;
      //TODO heck how to handle with internet connection error
      //second error shouldnot be neccesary
      const error = payload.response ? {
        message: payload.response.data.message,
        status: payload.response.status
      } : {
        message: payload.message
      };

      return StatisticLabel.merge({
        loading: false,
        error: error
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

    default:
      return state;
  }
}
