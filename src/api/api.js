import axios from 'axios';
import UserSession from '../actions/userSession/userSession';
import HandleError from '../actions/handleError'

const baseUrl = 'http://localhost:1234';

const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(response => {
  return response;
}, error => {
  HandleError(error); //handle generic errors
  return Promise.reject(error);
});

const getHeaders = () => {
  const token = UserSession.getToken();
  return {
    'Authorization': `Bearer ${token}`
  }
}

const get = (route) => {
  const headers = getHeaders();
  return instance.get(`${baseUrl}/${route}`, { headers });
}

const post = (route, data) => {
  const headers = getHeaders();
  return instance.post(`${baseUrl}/${route}`, data, { headers } );
}

const notAuthorizedGet = (route) => {
  return instance.get(`${baseUrl}/${route}`);
}

const notAuthorizedPost = (route, data) => {
  return instance.post(`${baseUrl}/${route}`, data);
}

export {
  get as GET,
  post as POST,
  notAuthorizedPost as notAuthorizedPOST,
  notAuthorizedGet as notAuthorizedGET
}
