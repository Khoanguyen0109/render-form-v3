import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector , useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';

import actions from './redux/authentication/actions';

const { theme } = config;

function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const dispatch = useDispatch()
  

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  useEffect(()=>{
    if(localStorage.getItem('userId') && localStorage.getItem('username')){
      dispatch(actions.loginSuccess({ id: localStorage.getItem('userId'), username: localStorage.getItem('userName') }));
      
    }
  },[])

  console.log('isLoggedIn', isLoggedIn)

  return (
    <SnackbarProvider autoHideDuration={2000}>
      <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
        <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
          <Router basename={process.env.PUBLIC_URL}>
            {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
            {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
              <Redirect to="/admin" />
            )}
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </SnackbarProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
