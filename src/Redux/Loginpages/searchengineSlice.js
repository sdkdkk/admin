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
export const searchengine = createAsyncThunk('user/getUserList', async(page, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/adminviewquestion?limit=5&skip=0`, { token });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const searchengineSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [searchengine.pending]: (state) => {
            state.isLoading = true;
        },
        [searchengine.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [searchengine.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default searchengineSlice.reducer;