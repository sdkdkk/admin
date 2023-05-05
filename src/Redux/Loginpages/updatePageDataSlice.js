import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


export const updatePageDataApi = createAsyncThunk('', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { id, status } =  payload 
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/cmsstatus/${id}`, { token, status});
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.response.data.error);
    }
})

export const updatePageDataSlice = createSlice({
    name: 'updatePageData',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [updatePageDataApi.pending]: (state) => {
            state.isLoading = true;
        },
        [updatePageDataApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [updatePageDataApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
           
        }
    }
})

export const { reset } = updatePageDataSlice.actions;
export default updatePageDataSlice.reducer;
