import axiosInstance from './axiosApi';

export const RecentPublishedApi = (data) =>
  axiosInstance.post('timeline/list', data).then((res) => res);

export const GetBookList = (data) =>
  axiosInstance.post('book/get_list', data).then((res) => res);

export const AddBookMemories = (data) =>
  axiosInstance.post('book/add_memories', data).then((res) => res);

export const SetWelcomePopupStatus = () =>
  axiosInstance.post('configurations/welcome_popup_visit', { type: 'set' });

  export const GetWelcomePopupStatus = () =>
  axiosInstance.post('configurations/welcome_popup_visit', { type: 'get' });  


