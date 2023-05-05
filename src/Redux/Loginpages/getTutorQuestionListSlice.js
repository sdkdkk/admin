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


export const getTutorQuestionsListApi = createAsyncThunk('', async(id, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/ask/tutorexamquestion`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const getTutorQuestionsListSlice = createSlice({
    name: 'getTutorQuestionsList',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [getTutorQuestionsListApi.pending]: (state) => {
            state.isLoading = true;
        },
        [getTutorQuestionsListApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getTutorQuestionsListApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        }
    }
})

export const { reset } = getTutorQuestionsListSlice.actions;
export default getTutorQuestionsListSlice.reducer;
