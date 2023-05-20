import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
        token: null,
        isSuccess : false
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
        //Sign-Up
        signUpPending: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            localStorage.setItem("token", state.token);
        },
        signUpFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },

        //Addnew
        AddnewPending: (state) => {
            state.loading = true;
        },
        AddnewSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            localStorage.setItem("token", state.token);
        },
        AddnewFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },


        //Pages
        PagesdPending: (state) => {
            state.loading = true;
        },
        PagesdSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            localStorage.setItem("token", state.token);
        },
        PagesdFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },

        //TutorExam
        TutorExamPending: (state) => {
            state.loading = true;
        },
        TutorExamSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            localStorage.setItem("token", state.token);
        },
        TutorExamFailure: (state, { payload }) => {
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
export const { resetAuth } =
authSlice.actions;
export const resetAuthAction = (formData) => async(dispatch) => {
    dispatch(resetAuth());
    
};

export const { signInPending, signInSuccess, signInFailure } =
authSlice.actions;
export const signIn = (formData) => async(dispatch) => {
    dispatch(signInPending());
    try {
        const { data } = await axios.post(
            "https://vaidik-backend.onrender.com/admin/login",
            formData
        );
        dispatch(signInSuccess(data));
    } catch (error) {
        dispatch(signInFailure(error.response.data));
    }
};


//Sign-Up
export const { signUpPending, signUpSuccess, signUpFailure } =
authSlice.actions;
export const signUp = (formData) => async(dispatch) => {
    dispatch(signUpPending());
    try {
        const { data } = await axios.post(
            "https://vaidik-backend.onrender.com/student/register/email",
            formData
        );
        dispatch(signUpSuccess(data));
    } catch (error) {
        dispatch(signUpFailure(error.response.data));
    }
};

// Pagesd

export const { PagesdPending, PagesdSuccess, PagesdFailure } =
authSlice.actions;
export const Pagesd = (formData) => async(dispatch) => {
    try {
        const { data } = await axios.post(
            "https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube",
            formData
        );
        dispatch(PagesdSuccess(data));
    } catch (error) {
        logoutIfInvalidToken(error.response)
        dispatch(PagesdFailure(error.response.data));
    }
};

// TutorExam

export const { TutorExamPending, TutorExamSuccess, TutorExamFailure } =
authSlice.actions;
export const TutorExam = (formData) => async(dispatch) => {
    try {
        const { data } = await axios.post(
            "https://632eb541b7314fc02f48d2d2.mockapi.io/crud-utube",
            formData
        );
        dispatch(TutorExamSuccess(data));
    } catch (error) {
        logoutIfInvalidToken(error.response)
        dispatch(TutorExamFailure(error.response.data));
    }
};

export default authSlice.reducer;