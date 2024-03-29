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


export const updateTutorQuestionApi = createAsyncThunk('admin/update/tutorexamquestion/', async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { id, ...rest } = payload
    try {
        const response = await axios.post(`${url}/admin/update/tutorexamquestion/${id}`, { token, ...rest });
         toast.success(response.data.message)
        return response.data;
       
    } catch (error) {
        logoutIfInvalidToken(error.response)
        toast.error(error.response.data.error)
        return rejectWithValue(error.response.data.error);
    }
})

export const updateTutorQuestionSlice = createSlice({
    name: 'updateTutorQuestion',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [updateTutorQuestionApi.pending]: (state) => {
            state.isLoading = true;
        },
        [updateTutorQuestionApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [updateTutorQuestionApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;

        }
    }
})

export const { reset } = updateTutorQuestionSlice.actions;
export default updateTutorQuestionSlice.reducer;