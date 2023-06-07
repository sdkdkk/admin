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


export const tutorPayments = createAsyncThunk('/admin/tutpay', async(page, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${url}/admin/tutpay`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const tutorPaymentsSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [tutorPayments.pending]: (state) => {
            state.isLoading = true;
        },
        [tutorPayments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [tutorPayments.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutorPaymentsSlice.reducer;