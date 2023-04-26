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
export const studentlistd = createAsyncThunk('user/getUserList', async(page, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/studentlist`, { token });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const studentlistSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [studentlistd.pending]: (state) => {
            state.isLoading = true;
        },
        [studentlistd.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [studentlistd.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default studentlistSlice.reducer;