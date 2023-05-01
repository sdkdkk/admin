import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const searchengineSlice = createSlice({
    name: "searchengine",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
        status: true,
    },
    reducers: {
        //Set-info
        searchenginePending: (state) => {
            state.loading = true;
        },
        searchengineSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.status = 1;
            state.error = null;
        },
        searchengineFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
            state.status = 0;
        },
    },
});

//Set-info
export const { searchenginePending, searchengineSuccess, searchengineFailure } =
searchengineSlice.actions;

const token = localStorage.getItem("token");
export const searchengine =
    (limit = 5, skip = 0) =>
    async(dispatch) => {
        dispatch(searchenginePending());
        try {
            const { data } = await axios.post(
                `https://vaidik-backend.onrender.com/admin/adminviewquestion?limit=${limit}&skip=${skip}`, { token }
            );
            if (data.status === 1) {
                dispatch(searchengineSuccess(data));
            } else {
                dispatch(searchengineFailure(data));
            }
        } catch (error) {
            dispatch(searchengineFailure(error.response.data));
        }
    };

export default searchengineSlice.reducer;