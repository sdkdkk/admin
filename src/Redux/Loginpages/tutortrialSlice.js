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


export const Tutortrial = createAsyncThunk('user/getUserList', async(page, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/trialtutor`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const tutortrialSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [Tutortrial.pending]: (state) => {
            state.isLoading = true;
        },
        [Tutortrial.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [Tutortrial.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutortrialSlice.reducer;