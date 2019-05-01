import { GET, POST } from '../Api';
import UserSession from '../Actions/UserSession';

const url = 'acuarelas';

export const getAllAcuarelas = () => {
  return dispatch => {
    dispatch({
      type: 'FETCH_ACUARELAS',
      payload: GET(url)
    });
  }
}

export const getAcuarelaDetails = (acuarelaId) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_ACUARELA_DETAILS',
      payload: GET(`${url}/${acuarelaId}`)
    });
  }
}

export const saveAcuarela = (acuarelaData) => {
  //TODO add author id and name before the save it, improve it
  const userData =  UserSession.getUser();
  acuarelaData.author = userData.userName;
  acuarelaData.authorId = userData.id;
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
