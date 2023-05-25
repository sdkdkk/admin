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


export const TutorsSuspend = async (id) => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/api/v1/admin//${id}`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        // return rejectWithValue(error.message);
    }
}


export const tutorSuspendSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [TutorsSuspend.pending]: (state) => {
            state.isLoading = true;
        },
        [TutorsSuspend.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [TutorsSuspend.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutorSuspendSlice.reducer;