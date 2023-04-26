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
export const Tutorsuspended = createAsyncThunk('user/getUserList', async(page, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/suspendtutor`, { token });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const tutorsuspendedSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [Tutorsuspended.pending]: (state) => {
            state.isLoading = true;
        },
        [Tutorsuspended.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [Tutorsuspended.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutorsuspendedSlice.reducer;