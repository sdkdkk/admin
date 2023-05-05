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


export const postTutorQuestionApi = createAsyncThunk('', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/ask/tutorexamquestion`, { token, ...payload });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.response.data.error);
    }
})

export const postTutorQuestionSlice = createSlice({
    name: 'postTutorQuestion',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [postTutorQuestionApi.pending]: (state) => {
            state.isLoading = true;
        },
        [postTutorQuestionApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [postTutorQuestionApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
            
        }
    }
})

export const { reset } = postTutorQuestionSlice.actions;
export default postTutorQuestionSlice.reducer;
