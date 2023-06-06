import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const { createSlice } = require("@reduxjs/toolkit");
const url = process.env.REACT_APP_API_BASE_URL;
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
        token: null,
        isSuccess: false
    },
    reducers: {
        signInPending: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.isSuccess = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            localStorage.setItem("token", state.token);
        },
        signInFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },
        resetAuth: (state) => {
            state.isSuccess = false;
        },
    },
});

//Sign-In
export const { resetAuth } = authSlice.actions;

export const resetAuthAction = (formData) => async(dispatch) => {
   dispatch(resetAuth());
 };

export const { signInPending, signInSuccess, signInFailure } =
authSlice.actions;
export const signIn = (formData) => async(dispatch) => {
    dispatch(signInPending());
    try {
        const { data } = await axios.post(
           ` ${url}/admin/login`,
            formData
        );
        dispatch(signInSuccess(data));
    } catch (error) {
        dispatch(signInFailure(error.response.data));
    }
};

export default authSlice.reducer;