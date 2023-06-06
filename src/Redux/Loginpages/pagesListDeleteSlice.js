import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { toast } from "react-toastify";
const url = process.env.REACT_APP_API_BASE_URL;
const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

export const pagesListDelete = createAsyncThunk('', async(id, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${url}/admin/cms/${id}`, { token });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const pagesListDeleteSlice = createSlice({
    name: 'pagesListDelete',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [pagesListDelete.pending]: (state) => {
            state.isLoading = true;
        },
        [pagesListDelete.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [pagesListDelete.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        }
    }
})

export const { reset } = pagesListDeleteSlice.actions;
export default pagesListDeleteSlice.reducer;
