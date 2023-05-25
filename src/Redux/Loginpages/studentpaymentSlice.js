import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";


const initialState = {
    data: [],
    isLoading: true,
    isSuccess: false,
    errorMessage: ''
}


export const tutorspayment = createAsyncThunk('tutors/Tutorspayment', async(page, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/api/v1/admin/tutorspayment`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const studentpaymentSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [tutorspayment.pending]: (state) => {
            state.isLoading = true;
        },
        [tutorspayment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [tutorspayment.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})
export default studentpaymentSlice.reducer;