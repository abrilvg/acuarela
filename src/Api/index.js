import axios from 'axios';

let baseUrl = 'http://localhost:1234';

const nlGet = (route) => {
  return axios.get(`${baseUrl}/${route}`);
}

const get = (route) => {
  let headers = {
    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
  }
  return axios.get(`${baseUrl}/${route}`, {headers});
}

const nlPost = (route, data) => {
  return axios.post(`${baseUrl}/${route}`, data);
}

const post = (route, data) => {
  let headers = {
    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
  }
  return axios.post(`${baseUrl}/${route}`, data, {headers});
}

export {
  get as GET,
  post as POST,
  nlPost as nlPOST,
  nlGet as nlGET
}
