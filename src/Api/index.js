import axios from 'axios';
import UserSession from "../UserSession";

let baseUrl = 'http://localhost:1234';

const nlGet = (route) => {
  return axios.get(`${baseUrl}/${route}`);
}

const get = (route) => {
  let token = UserSession.getToken();
  let headers = {
    'Authorization': `Bearer ${token}`
  }
  return axios.get(`${baseUrl}/${route}`, { headers });
}

const nlPost = (route, data) => {
  return axios.post(`${baseUrl}/${route}`, data);
}

const post = (route, data) => {
  let token = UserSession.getToken();
  let headers = {
    'Authorization': `Bearer ${token}`
  }
  return axios.post(`${baseUrl}/${route}`, data, { headers });
}

export {
  get as GET,
  post as POST,
  nlPost as nlPOST,
  nlGet as nlGET
}
