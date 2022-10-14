import axiosInstance from './axiosApi';

export const RecentPublishedApi = (data) =>
  axiosInstance.post('timeline/list', data).then((res) => res);
  
export const LoginApi = (data) => axiosInstance.post('alumni/login', data);
export const Logout = () => axiosInstance.post('alumni/logout');

export const SsoLogin = (obj) => axiosInstance.post('alumni/ssologin', obj);

export const ResetPasswordApi = (obj) =>
  axiosInstance.post('alumni/forgot_password', obj);

export const RegisterApi = (obj) => axiosInstance.post('alumni/register', obj);

export const Check = () =>
  axiosInstance.post('configurations/registration_form_details');

export const ProfileInfo = () =>
  axiosInstance.post('alumni/profile_page_details', {
    configurationTimestamp: '1536928630',
  });

export const SetWelcomePopupStatus = () =>
  axiosInstance.post('configurations/welcome_popup_visit', { type: 'set' });

  export const GetWelcomePopupStatus = () =>
  axiosInstance.post('configurations/welcome_popup_visit', { type: 'get' });  
export const ChangePasswordApi = (obj) =>
  axiosInstance.post('alumni/change_password', obj).then((res) =>res); 

