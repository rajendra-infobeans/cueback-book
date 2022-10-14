import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  RecentPublishedApi,
} from '../../app-api/api';
import { GetMemories } from '../../app-api/newApi';
import { recentObject, recentResponse } from '../../util/Format';


export const fetchBookMemories = createAsyncThunk(
  'memory/recentPublishedApis',
  async (obj) => {
    const data = process.env.GATSBY_NEW_API === 'TRUE' ? obj : recentObject(obj);
    const response = process.env.GATSBY_NEW_API === 'TRUE' ? await GetMemories(data) : await RecentPublishedApi(data);
    const result = process.env.GATSBY_NEW_API === 'TRUE' ? response : recentResponse(response);
    return result;
  }
);

export const fetchCurrentUserBookMemories = createAsyncThunk(
    'memory/recentPublishedApi',
    async (obj) => {
      const data = process.env.GATSBY_NEW_API === 'TRUE' ? obj : recentObject(obj);
      const response = process.env.GATSBY_NEW_API === 'TRUE' ? await GetMemories(data) : await RecentPublishedApi(data);
      const result = process.env.GATSBY_NEW_API === 'TRUE' ? response : recentResponse(response);
      return result;
    })

const initialState = {
  bookMemories:[],
  bookMemoriesStatus:'',
  page: 0,
  hasMoreData: true,
};
export const BookMemorySlice = createSlice({
  name: 'bookMemory',
  initialState,
  reducers: {
    sortBookMemoriesByAlphabetical: (state) => {
      state.bookMemories.sort((a,b) => (a.title > b.title ? 1 : -1));
    },
    sortBookMemoriesByChronological: (state) => {
      state.bookMemories.sort((a,b) => (b.memory_date - a.memory_date));
    },
    pageCounter: (state) => {
      state.page += 1;
    },
  },
  extraReducers: {
    [fetchBookMemories.pending]: (state) => {
      state.bookMemoriesStatus = 'loading';
    },
    [fetchBookMemories.fulfilled]: (state, action) => {
      state.bookMemoriesStatus = 'idle';
      if (action?.payload && action?.payload?.code && action?.payload?.code === 200) {
        state.bookMemories = [
          ...state?.bookMemories,
          ...(action?.payload?.data ? action?.payload?.data : []),
        ];
      } else {
        localStorage.clear();
        window.location.reload();
      }
    },
    [fetchBookMemories.rejected]: (state, action) => {
      state.bookMemoriesStatus = 'failed';
    },
    [fetchCurrentUserBookMemories.pending]: (state) => {
        state.status = 'loading';
      },
    [fetchCurrentUserBookMemories.fulfilled]: (state, action) => {
    state.status = 'idle';
    if (action?.payload && action?.payload?.code && action?.payload?.code === 200) {
        state.bookMemories = [
        ...state?.bookMemories,
        ...(action?.payload?.data ? action?.payload?.data : []),
        ];
        if (action?.payload?.data?.length === 0) {
            state.hasMoreData = false
        }
    } else {
        localStorage.clear();
        window.location.reload();
    }
    },
    [fetchCurrentUserBookMemories.rejected]: (state, action) => {
    state.status = 'failed';
    state.hasMoreData = false;
    localStorage.clear();
    window.location.reload();
    state.error = action.payload;
    },
  
  },
});

export const {
  sortBookMemoriesByAlphabetical,
  sortBookMemoriesByChronological,
  pageCounter,
} = BookMemorySlice.actions;

export const selectBookMemories = (state) => {
  return state?.bookMemory?.bookMemories;
}
export const selectBookMemoriesStatus = (state) => state?.bookMemory?.bookMemoriesStatus;
export const selectPage = (state) => state?.bookMemory?.page;
export const selectHasMoreData = (state) => state?.bookMemory?.hasMoreData;

export default BookMemorySlice.reducer;