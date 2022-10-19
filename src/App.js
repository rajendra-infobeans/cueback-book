import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/colors';
import routes from './navigator/routes';
import { useRoutes } from 'react-router-dom';
import AppLayout from './components/AppLayout';

import Cookies from 'js-cookie';

const App = () => {
  const isLoggedIn = Cookies.get('idToken') ? true : false;
  const routing = useRoutes(routes(isLoggedIn));
  return (
    <>
    <ThemeProvider theme={theme}>
    <AppLayout />
    {routing}
    </ThemeProvider>
    </>
  );
}

export default App;
