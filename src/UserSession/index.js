/**
 * Handle localstorage data only
*/
const UserSession = {
  getToken: () => {
    return localStorage.getItem('user_token');
  },
  setToken: (token) => {
    localStorage.setItem('user_token', token);
  },
  hasToken: () => {
    return localStorage.getItem('user_token') !== null;
  },
  getUser: () => {
    return {
      userName: localStorage.getItem('user_name') ? localStorage.getItem('user_name') : '',
      id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : ''
    }
  },
  saveUser: (userData) => {
    localStorage.setItem('user_token', userData.token);
    localStorage.setItem('user_name', userData.data.name);
    localStorage.setItem('user_id', userData.data._id);
  },
  deleteUser: () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
  }
};

export default UserSession;
