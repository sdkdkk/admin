import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { toast } from "react-toastify";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

export const testimonialUserDelete = createAsyncThunk('user/getUserList', async(id, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/admin/testimonial/${id}`, { token });
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const testimonialUserDeleteSlice = createSlice({
    name: 'testimonialUserDelete',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [testimonialUserDelete.pending]: (state) => {
            state.isLoading = true;
        },
        [testimonialUserDelete.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [testimonialUserDelete.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        }
    }
})

export const { reset } = testimonialUserDeleteSlice.actions;
export default testimonialUserDeleteSlice.reducer;
