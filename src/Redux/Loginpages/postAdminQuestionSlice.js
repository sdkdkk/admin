import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";

import { logoutIfInvalidToken } from "../../helpers/handleError";

import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


export const postAdminQuestionsApi = createAsyncThunk('admin/sendanswer', async (payload, { rejectWithValue }) => {

    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${url}/admin/sendanswer`, { token, ...payload });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const postAdminQuestionsSlice = createSlice({
    name: 'postAdminQuestions',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [postAdminQuestionsApi.pending]: (state) => {
            state.isLoading = true;
        },
        [postAdminQuestionsApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [postAdminQuestionsApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export const { reset } = postAdminQuestionsSlice.actions;
export default postAdminQuestionsSlice.reducer;