import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { useParams } from 'react-router-dom';
import { logoutIfInvalidToken } from "../../helpers/handleError";


const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}


export const tutordetail = createAsyncThunk('tutors/Tutorspayment', async(page, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { _id } = useParams();
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/tutorquestionanswer/${_id}`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const tutordetailSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [tutordetail.pending]: (state) => {
            state.isLoading = true;
        },
        [tutordetail.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [tutordetail.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default tutordetailSlice.reducer;