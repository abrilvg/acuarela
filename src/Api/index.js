import axios from 'axios';
import UserSession from "../UserSession";

let baseUrl = 'http://localhost:1234';

//not logged get
const nlGet = (route) => {
  return axios.get(`${baseUrl}/${route}`);
}

// get when already authentificated
const get = (route) => {
  let token = UserSession.getToken();
  let headers = {
    'Authorization': `Bearer ${token}`
  }
  return axios.get(`${baseUrl}/${route}`, { headers });
}

//not logged post
const nlPost = (route, data) => {
  return axios.post(`${baseUrl}/${route}`, data);
}

//post when already authentificated
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
