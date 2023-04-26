import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


const token = localStorage.getItem('token')
export const tutorunverified = createAsyncThunk('user/getUserList', async(page, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/unverifiedtutor`, { token });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const tutorunverifiedSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [tutorunverified.pending]: (state) => {
            state.isLoading = true;
        },
        [tutorunverified.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [tutorunverified.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutorunverifiedSlice.reducer;