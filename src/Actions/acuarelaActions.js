import { GET, POST } from "../Api";

const url = 'acuarelas';

export const getAllAcuarelas = () => {
  return dispatch => {
    dispatch({
      type: 'FETCH_ACUARELAS',
      payload: GET(url)
    });
  }
}

export const saveAcuarela = (acuarelaData) => {
  return dispatch => {
    dispatch({
      type: 'SAVE_ACUARELA',
      payload: POST(url, acuarelaData)
    });
  }
}

export const clearAcuarelasError = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAN_ACUARELAS'
    });
  }
}

export const startLoadingPictures = () => {
  return dispatch => {
    dispatch({
      type: 'LOADING_ACUARELA_STARTS'
    });
  }
}

export const successLoadingPictures = () => {
  return dispatch => {
    dispatch({
      type: 'LOADING_ACUARELA_SUCCESS'
    });
  }
}

export const errorLoadingPictures = (error) => {
  return dispatch => {
    dispatch({
      type: 'LOADING_ACUARELA_ERROR',
      error
    });
  }
}
