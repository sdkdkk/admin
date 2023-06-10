import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

export const getstudentcontact = createAsyncThunk(
    "user/getUserList",
    async (selectedStatus, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `${url}/admin/getstudentcontact?limit=5&skip=0`, { token }
            );
            return response.data;
        } catch (error) {
            logoutIfInvalidToken(error.response);
            return rejectWithValue(error.message);
        }
    }
);

export const getstudentcontactSlice = createSlice({
    name: "user",
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
            state.errorMessage = payload;
        },
    },
});

export default getstudentcontactSlice.reducer;