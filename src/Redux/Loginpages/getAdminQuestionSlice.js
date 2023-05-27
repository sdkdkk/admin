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


export const getAdminQuestions = createAsyncThunk('admin/adminquestion?questionType', async(payload, { rejectWithValue }) => {
    const { questionType, questionSubject, whomto_ask, limit, skip } = payload
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${url}/admin/adminquestion?questionType=${questionType}&questionSubject=${questionSubject}&whomto_ask=${whomto_ask}&limit=${limit}&skip=${skip} `, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})


export const getAdminQuestionsSlice = createSlice({
    name: 'getAdminQuestions',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [getAdminQuestions.pending]: (state) => {
            state.isLoading = true;
        },
        [getAdminQuestions.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getAdminQuestions.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
        }
    }
})

export const { reset } = getAdminQuestionsSlice.actions;
export default getAdminQuestionsSlice.reducer;