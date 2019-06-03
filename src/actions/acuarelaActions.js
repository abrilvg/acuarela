import { GET, POST } from '../api';
import UserSession from '../actions/userSession';

const url = 'acuarelas';

export const getAllAcuarelas = (dispatch) => {
  dispatch({
    type: 'FETCH_ACUARELAS_START'
  });
  GET(url, dispatch)
    .then(response => {
      dispatch({
        type: 'FETCH_ACUARELAS_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('fetch acuarelas error', error);
        dispatch({
        type: 'FETCH_ACUARELAS_REJECTED',
      });
    })
}

export const getAcuarelasByCurrentUser = (dispatch) => {
  dispatch({
    type: 'FETCH_ACUARELAS_BY_USER_START'
  });
  const authorId = UserSession.getUser().id;
  GET(`${url}/user/${authorId}`)
    .then(response => {
      dispatch({
        type: 'FETCH_ACUARELAS_BY_USER_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('fetch acuarelas by user error', error);
      dispatch({
        type: 'FETCH_ACUARELAS_BY_USER_REJECTED',
      });
    })
}

export const getAcuarelaDetails = (dispatch, acuarelaId) => {
  dispatch({
    type: 'FETCH_ACUARELA_DETAILS_START'
  });
  GET(`${url}/${acuarelaId}`)
    .then(response => {
      dispatch({
        type: 'FETCH_ACUARELA_DETAILS_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('fetch acuarelas by user error', error);
      dispatch({
        type: 'FETCH_ACUARELA_DETAILS_REJECTED',
      });
    })
}

export const saveAcuarela = (dispatch, acuarelaData) => {
  dispatch({
    type: 'SAVE_ACUARELA_START'
  });
  //TODO add author id and name before the save it, improve it
  const userData =  UserSession.getUser();
  acuarelaData.author = userData.userName;
  acuarelaData.authorId = userData.id;
  POST(url, acuarelaData)
    .then(response => {
      dispatch({
        type: 'SAVE_ACUARELA_FULFILLED',
        payload: response
      });
    })
    .catch(error => {
      console.log('save acuarela error', error);
      dispatch({
        type: 'SAVE_ACUARELA_REJECTED',
      });
    })
}

export const startLoadingPictures = (dispatch) => {
  dispatch({
    type: 'LOADING_ACUARELA_STARTS'
  });
}

export const successLoadingPictures = (dispatch) => {
  dispatch({
    type: 'LOADING_ACUARELA_SUCCESS'
  });
}

export const errorLoadingPictures = (dispatch, error) => {
  dispatch({
    type: 'LOADING_ACUARELA_ERROR',
    error
  });
}
