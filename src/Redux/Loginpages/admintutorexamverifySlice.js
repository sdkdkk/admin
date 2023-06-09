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



export const admintutorexamverify = createAsyncThunk('user/getUserList', async (page, { rejectWithValue }) => {
   try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${url}/admin/admintutorexamverify`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const admintutorexamverifySlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [admintutorexamverify.pending]: (state) => {
            state.isLoading = true;
        },
        [admintutorexamverify.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [admintutorexamverify.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default admintutorexamverifySlice.reducer;