import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { logoutIfInvalidToken } from "../../helpers/handleError";

const url = process.env.REACT_APP_API_BASE_URL;

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
        reset: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.status = 0;
        },
    },
});

//Set-info
export const {
    searchenginePending,
    searchengineSuccess,
    searchengineFailure,
    reset,
} = searchengineSlice.actions;

// export const searchenginereset = (a = 5) => {

//     async(dispatch) => {
//         dispatch(reset());
//     }

// }
export const searchengine =
    (limit = 5, skip = 0, act = 0) =>
        async (dispatch) => {
            if (act === 1) {

                localStorage.removeItem("token");
                dispatch(reset());
            } else {
                dispatch(searchenginePending());
                try {
                    const token = localStorage.getItem("token");
                    const { data } = await axios.post(
                        `${url}/admin/adminviewquestion?limit=${limit}&skip=${skip}`, { token }
                    );
                    if (data.status === 1) {
                        dispatch(searchengineSuccess(data));
                    } else {
                        dispatch(searchengineFailure(data));
                    }
                } catch (error) {
                    logoutIfInvalidToken(error.response)
                    dispatch(searchengineFailure(error.response.data));
                }
            }
        };

export default searchengineSlice.reducer;