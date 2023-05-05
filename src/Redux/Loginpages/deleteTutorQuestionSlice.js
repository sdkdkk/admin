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

export const deleteTutorQuestion = createAsyncThunk('', async(id, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/question/${id}`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const deleteTutorQuestionSlice = createSlice({
    name: 'deleteTutorQuestion',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [deleteTutorQuestion.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteTutorQuestion.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [deleteTutorQuestion.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        }
    }
})

export const { reset } = deleteTutorQuestionSlice.actions;
export default deleteTutorQuestionSlice.reducer;
