import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
// import isBrowser from '../util/gatsby';
const isBrowser = typeof window !== 'undefined';
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isBrowser) return false;

  //if (true) {
  if (localStorage.getItem('idToken')) {
    return <Component {...rest} />;
  } else {
    navigate('/auth/login');
    return null;
  }
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;