import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  SetWelcomePopupStatus,
  GetWelcomePopupStatus,
} from '../../app-api/api';

export const SetWelcomePopUpStatus = createAsyncThunk(
  'head/setWelcomePopup',
  () => SetWelcomePopupStatus()
);

export const GetWelcomePopUpStatus = createAsyncThunk(
  'head/getWelcomePopup',
  () => GetWelcomePopupStatus()
);
const initialState = {
  title: 'Home',
  theme: 'dark', // UI should be able to accomodate this!
  description: '', // a 2-3 line description of a page,
  welcomePopup: false,
};

export const HeadSlice = createSlice({
  initialState,
  name: 'head',
  reducers: {
    setPageTitle: (state, action) => {
      let title = action.payload;
      if (title) {
        state.title = title;
      }
    },
    setPageDescription: (state, action) => {
      const description = action.payload;
      state.description = description;
    },
    setTheme: (state, action) => {
      const theme = action.payload;
      state.theme = theme;
    },
  },
  extraReducers: {
    [GetWelcomePopUpStatus.fulfilled]: (state, action) => {
      state.welcomePopup = action?.payload?.Details?.welcome_popup_visited === 0;
    },
    [GetWelcomePopUpStatus.rejected]: (state, action) => {
      // action;
      state.welcomePopup = false;
    },

    [SetWelcomePopUpStatus.fulfilled]: (state, action) => {
      state.welcomePopup = !action?.payload?.Details?.welcome_popup_visited === 0;
    },
    [SetWelcomePopUpStatus.rejected]: (state, action) => {
      // action;
      state.welcomePopup = false;
    },
  },
});
export default HeadSlice.reducer;

export const { setPageTitle, setPageDescription, setTheme } = HeadSlice.actions;

export const selectPageTitle = (state) => state.head.title;
export const selectPageDescription = (state) => state.head.description;
export const selectTheme = (state) => state.head.theme;
export const selectWelcomePopUpStatus = (state) => state.head.welcomePopup;
