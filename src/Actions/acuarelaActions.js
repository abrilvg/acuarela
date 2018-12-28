import { GET, POST } from "../Api";

const url = 'acuarelas';

export const getAllAcuarelas = () => {
  console.log('get all acuaas');
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

export const cleanAcuarelas = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAN_ACUARELAS'
    });
  }
}
