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


export const getTutorQuestionsListApi = createAsyncThunk('admin/gettutorexamquestion?', async(payload, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const { questionSubject, questionType, limit, skip, searchParams = "" } = payload
    try {
        const response = await axios.post(`${url}/admin/gettutorexamquestion?questionSubject=${questionSubject}&questionType=${questionType}&limit=${limit}&skip=${skip}${searchParams}`, { token });
        return response.data;
    } catch (error) {
        logoutIfInvalidToken(error.response)
        return rejectWithValue(error.message);
    }
})

export const getTutorQuestionsListSlice = createSlice({
    name: 'getTutorQuestionsList',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [getTutorQuestionsListApi.pending]: (state) => {
            state.isLoading = true;
        },
        [getTutorQuestionsListApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        [getTutorQuestionsListApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        }
    }
})

export const { reset } = getTutorQuestionsListSlice.actions;
export default getTutorQuestionsListSlice.reducer;
