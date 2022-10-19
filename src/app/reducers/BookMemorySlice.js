import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  RecentPublishedApi,
  AddBookMemories,
  GetBookList,
} from '../../app-api/api';
import { GetMemories } from '../../app-api/newApi';
import { recentObject, recentResponse, bookResponse } from '../../util/Format';
import { getDomain } from '../../util/functions';
import Cookies from 'js-cookie';


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
    }
);

export const addBookMemories = createAsyncThunk(
  'memory/AddBookMemories',
  async (obj) => {
    const data = obj;
    const response =  await AddBookMemories(data);
    const result = process.env.GATSBY_NEW_API === 'TRUE' ? response : bookResponse(response);
    return result;
  }
);

export const getBookList = createAsyncThunk(
  'memory/GetBookList',
  async(obj) => {
    const response = await GetBookList(obj);
    const result = process.env.GATSBY_NEW_API === 'TRUE' ? response : bookResponse(response);
    return result;
  }
);


const initialState = {
  bookMemories:[],
  bookMemoriesStatus:'',
  page: 0,
  hasMoreData: true,
  hasBooks: null,
  totalMemories: 0
};
const domain = getDomain();
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
        state.totalMemories = action?.payload?.page?.totalItems;
        if (action?.payload?.page?.totalItems === 0) {
          state.hasMoreData = false;
        }
        
      } else {
        Cookies.remove('uid', { domain: domain });
        Cookies.remove('idToken', { domain: domain });
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
        Cookies.remove('uid', { domain: domain });
        Cookies.remove('idToken', { domain: domain });
    }
    },
    [fetchCurrentUserBookMemories.rejected]: (state, action) => {
    state.status = 'failed';
    state.hasMoreData = false;
    localStorage.clear();
    window.location.reload();
    state.error = action.payload;
    },
    [addBookMemories.pending]: (state) => {
      state.bookMemoriesStatus = 'loading';
    },
    [addBookMemories.fulfilled]: (state, action) => {
      state.bookMemoriesStatus = 'idle';
      if (action?.payload && action?.payload?.code && action?.payload?.code === 200) {
        state.hasBooks = true;
      }
    },
    [addBookMemories.rejected]: (state) => {
      state.bookMemoriesStatus = 'failed';
    },
    [getBookList.pending]: (state) => {
      state.hasBooks = false;
    },
    [getBookList.fulfilled]: (state, action) => {
      if (action?.payload && action?.payload?.code && action?.payload?.code === 200) {
        state.hasBooks = action?.payload?.totalItems > 0 ? true : false;
      }
      else {
        Cookies.remove('uid', { domain: domain });
        Cookies.remove('idToken', { domain: domain });
      }
    },
    [getBookList.rejected]: (state) => {
      state.hasBooks = false;
      Cookies.remove('uid', { domain: domain });
      Cookies.remove('idToken', { domain: domain });
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
export const selectHasBooks = (state) => state?.bookMemory?.hasBooks;
export const selectTotalMemories = (state) => state?.bookMemory.totalMemories;
export default BookMemorySlice.reducer;