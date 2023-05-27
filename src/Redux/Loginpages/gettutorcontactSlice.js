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

export const gettutorcontact = createAsyncThunk(
    'user/getUserList',
    async(status, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        const issolved = status === "solved" ? 1 : 0;

        try {
            const response = await axios.post(
                `${url}/admin/gettutorcontact?limit=5&skip=0&issolved=${issolved}`, { token }
            );
            return response.data;
        } catch (error) {
            logoutIfInvalidToken(error.response);
            return rejectWithValue(error.message);
        }
    }
);

export const gettutorcontactSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [gettutorcontact.pending]: (state) => {
            state.isLoading = true;
        },
        [gettutorcontact.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [gettutorcontact.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default gettutorcontactSlice.reducer;