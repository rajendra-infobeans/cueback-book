import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getDomain } from '../util/functions';
const RedirectUrl = ({ url }) => {
    const domain = getDomain();
    Cookies.set('location-redirect', window.location.href, { domain: domain });
  
    useEffect(() => {
            window.location.assign(url);
    }, [url]);
  
    return null;

  };

export default RedirectUrl;
