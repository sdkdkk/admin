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


export const updateTutorQuestionApi = createAsyncThunk('admin/delete/tutorexamquestion/', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { id, ...rest } =  payload 
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/api/v1/admin/delete/tutorexamquestion/${id}`, { token, ...rest});
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
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
