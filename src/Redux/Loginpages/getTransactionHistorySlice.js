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


export const getTransactionHistory = createAsyncThunk('/admin/fetchTransactionHistory', async(params, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/fetchTransactionHistory${params}`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const getTransactionHistorySlice = createSlice({
    name: 'getTransactionHistory',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [getTransactionHistory.pending]: (state) => {
            state.isLoading = true;
        },
        [getTransactionHistory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getTransactionHistory.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export const { reset } = getTransactionHistorySlice.actions;
export default getTransactionHistorySlice.reducer;