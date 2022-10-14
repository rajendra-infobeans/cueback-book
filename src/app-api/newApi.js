import axiosInstance from './axiosNewApi';

export const SignInApi = (data) => axiosInstance.post('user/api/v1/users/authentication/authenticate', data);

export const FederatedSignIn = (data) => axiosInstance.post('user/api/v1/users/authentication/add-cognito-user', data);

export const GetMemories = (data) => axiosInstance.get('memories/api/v1/memories/', data);