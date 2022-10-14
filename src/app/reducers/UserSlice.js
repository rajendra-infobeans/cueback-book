import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChangePasswordApi, ProfileInfo } from '../../app-api/api';

export const fetchUserDetails = createAsyncThunk('user/userDetails', async (obj) => {
    const response = await ProfileInfo(obj);
    return response;
});

export const changePassword = createAsyncThunk('user/changePassword', async (obj) => {
    const response = await ChangePasswordApi(obj);
    return response;
})

const initialState = {
    status: 'idle',
    UserDetails: [],
    ChangePasswordResponse:{}
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [fetchUserDetails.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchUserDetails.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.UserDetails = action.payload;
        },
        [fetchUserDetails.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [changePassword.pending]: (state) => {
            state.status = 'loading';
        },
        [changePassword.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.ChangePasswordResponse = action.payload;
        },
        [changePassword.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const selectChangePasswordResponse = (state) => state.user.ChangePasswordResponse;
export const selectUserDetails = (state) => state.user.UserDetails;
export const selectStatus = (state) => state.user.status;
export default UserSlice.reducer;
