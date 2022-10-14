import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const RedirectUrl = ({ url }) => {
    const navigate = useNavigate();
    Cookies.set('location-redirect', window.location.href, { domain: 'local-mystories.com' });
    console.log(Cookies.get('idToken'));
    useEffect(() => {
        console.log('use effect');
        if (Cookies.get('idToken')) {
            console.log('Token accessed');
            // return <h5>Redirected Back After login</h5>;
            navigate('/bookeditor');
        }
        else {
            window.location.assign(url);
        }
        
    }, [url]);
  
    return <h5>Redirecting...</h5>;

  };

export default RedirectUrl;
