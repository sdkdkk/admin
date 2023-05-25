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


export const admintutorexamresponse = createAsyncThunk('user/getUserList', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/api/v1/admin/admintutorexamresponse`, { token, ...payload  });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const admintutorexamresponseSlice = createSlice({
    name: 'admintutorexamresponse',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [admintutorexamresponse.pending]: (state) => {
            state.isLoading = true;
        },
        [admintutorexamresponse.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [admintutorexamresponse.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export const { reset } = admintutorexamresponseSlice.actions;
export default admintutorexamresponseSlice.reducer;