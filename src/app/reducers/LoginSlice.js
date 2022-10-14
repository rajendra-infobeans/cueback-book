/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginApi, SsoLogin } from '../../app-api/api';
import { FederatedSignIn, SignInApi } from '../../app-api/newApi';
import { loginObject, loginResponse } from '../../util/Format';
import jwt_decode from 'jwt-decode';

export const LoginAsync = createAsyncThunk('login/LoginApi', async (obj) => {
  const payload = process.env.REACT_APP_NEW_API === 'TRUE' ? obj : loginObject(obj)
  const response = process.env.REACT_APP_NEW_API === 'TRUE' ? await SignInApi(payload) : await LoginApi(payload);
  const result = process.env.REACT_APP_NEW_API === 'TRUE' ? response : loginResponse(response);
  if (result.code === 200) {
    localStorage.setItem('uid', result.data.uid);
    localStorage.setItem('idToken', result.data.token.idToken);
    localStorage.setItem('refreshToken', result.data.token.refreshToken);
    localStorage.setItem('auth_time', result.data.auth_time);
    localStorage.setItem('email', result.data.email);
    localStorage.setItem('exp', result.data.exp);
    localStorage.setItem('fullName',result.data.fullName);
  }
  return result;
});

export const GoogleLoginAsync = createAsyncThunk('login/GoogleLogin',async () => {
  const idToken = localStorage.getItem('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.' + localStorage.getItem('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.LastAuthUser') + '.idToken');
  const refreshToken = localStorage.getItem('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.' + localStorage.getItem('CognitoIdentityServiceProvider.4ufoedd4so0jq9j8fd7k3oroua.LastAuthUser') + '.refreshToken');
  const decoded = jwt_decode(idToken);
  const obj = {
    'cognitoUid': decoded.sub,
        'status': 'EXTERNAL_PROVIDER',
        'firstName': decoded.given_name,
        'lastName': decoded.family_name,
        'primaryEmail': decoded.email
  };
  const response = await FederatedSignIn(obj);
  if(response.code === 200) {
    localStorage.clear();
    localStorage.setItem('uid', decoded.sub);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('auth_time', Math.floor(new Date().getTime() / 1000));
    localStorage.setItem('email', decoded.email);
  }
  return response;
})

export const SsoLoginAsync = createAsyncThunk('login/SsoLoginApi', async (obj) => {
  const result = await SsoLogin(obj);
  const response = loginResponse(result);
  if (response.code === 200) {
    localStorage.setItem('uid', response.data.uid);
    localStorage.setItem('idToken', response.data.token.idToken);
    localStorage.setItem('refreshToken', response.data.token.refreshToken);
    localStorage.setItem('auth_time', response.data.auth_time);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('exp', response.data.exp);
  }
  return response;
}
);

const initialState = {
  LoginResponse: {},
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: {
    [LoginAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [LoginAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.LoginResponse = action.payload;
    },
    [LoginAsync.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [SsoLoginAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [SsoLoginAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.LoginResponse = action.payload;
    },
    [SsoLoginAsync.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [GoogleLoginAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [GoogleLoginAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.LoginResponse = action.payload;
    },
    [GoogleLoginAsync.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

  },
});

export const selectLoginResponse = (state) => state.login.LoginResponse;
export const selectStatus = (state) => state.login.status;
export default LoginSlice.reducer;
