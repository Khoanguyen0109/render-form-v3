import axios from 'axios';
import Cookies from 'js-cookie';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (value) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      // setTimeout(() => {
      //   Cookies.set('logedIn', true);
      //   return dispatch(loginSuccess(true));
      // }, 1000);
      const res = await axios.post(`${process.env.REACT_APP_API_END_POINT}/api/login`, {
        username: value.username,
        password: value.password,
      });
      localStorage.setItem('userId' , res.data.id)
      localStorage.setItem('username' , res.data.username)

      return dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
