/* eslint-disable max-len */
import axios from 'axios';
import Cookies from 'js-cookie';
// import isBrowser from '../util/gatsby';
const isBrowser = typeof window !== 'undefined';
const baseURL = 'https://cn.cuebackqa.com';
const axiosInstance = axios.create({
  baseURL,
  headers: {
   'platform':'2',
   'apptype':'0',
   'Accept-Language':'en'
  },
});

axiosInstance.interceptors.request.use((req) => {
  if (isBrowser) {
    req.headers['Authorization'] = Cookies.get('idToken') || Cookies.get('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.' + Cookies.get('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.LastAuthUser') + '.idToken');
    req.headers['refreshToken'] = Cookies.get('refreshToken') || Cookies.get('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.' + Cookies.get('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.LastAuthUser') + '.refreshToken');
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error('Error: ', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;