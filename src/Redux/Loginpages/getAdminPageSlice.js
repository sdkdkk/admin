import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";

import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


export const getAdminPagesApi = createAsyncThunk('/admin/getadminpages', async (page, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${url}/admin/getadminpages`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const getAdminPageSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getAdminPagesApi.pending]: (state) => {
            state.isLoading = true;
        },
        [getAdminPagesApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getAdminPagesApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default getAdminPageSlice.reducer;