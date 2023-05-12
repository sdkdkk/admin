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


export const postAdminQuestions = createAsyncThunk('admin/sendanswer', async(payload, { rejectWithValue }) => {
    
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/sendanswer`, { token, ...payload });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
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
        [postAdminQuestions.pending]: (state) => {
            state.isLoading = true;
        },
        [postAdminQuestions.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [postAdminQuestions.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export const { reset } = postAdminQuestionsSlice.actions;
export default postAdminQuestionsSlice.reducer;