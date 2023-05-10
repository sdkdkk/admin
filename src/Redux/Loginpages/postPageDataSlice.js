import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { toast } from "react-toastify";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


export const postPageDataApi = createAsyncThunk('/admin/cms', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/cms`, { token, ...payload });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.response.data.error);
    }
})

export const postPageDataSlice = createSlice({
    name: 'postPageData',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [postPageDataApi.pending]: (state) => {
            state.isLoading = true;
        },
        [postPageDataApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [postPageDataApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
            
        }
    }
})

export const { reset } = postPageDataSlice.actions;
export default postPageDataSlice.reducer;
