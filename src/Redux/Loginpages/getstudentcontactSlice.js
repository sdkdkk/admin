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

export const getstudentcontact = createAsyncThunk(
    "user/getUserList",
    async(status, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        const issolved = status === "1" ? 1 : status === "0" ? 0 : null; // Set issolved based on status

        console.log(issolved);
        try {
            const response = await axios.post(
                `${url}/admin/getstudentcontact?limit=5&skip=0&issolved=${issolved}`, { token }
            );
            return response.data;
        } catch (error) {
            logoutIfInvalidToken(error.response);
            return rejectWithValue(error.message);
        }
    }
);

export const getstudentcontactSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getstudentcontact.pending]: (state) => {
            state.isLoading = true;
        },
        [getstudentcontact.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getstudentcontact.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export default getstudentcontactSlice.reducer;