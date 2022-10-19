import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const RedirectUrl = ({ url }) => {
    const navigate = useNavigate();
    Cookies.set('location-redirect', window.location.href, { domain: 'local-mystories.com' });
  
    useEffect(() => {
            window.location.assign(url);
    }, [url]);
  
    return null;

  };

export default RedirectUrl;
