import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";

import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

export const tutorspayment = createAsyncThunk('tutors/Tutorspayment', async ( { rejectWithValue }) => {

    const token = localStorage.getItem('token')
    const isPaymentDone =0
    try {
        const response = await axios.post(`${url}/admin/tutorspayment`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const tutorspaymentSlice = createSlice({
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

export default tutorspaymentSlice.reducer;