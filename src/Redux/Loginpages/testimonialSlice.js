import axios from 'axios';
import { logoutIfInvalidToken } from '../../helpers/handleError';

const { createSlice } = require("@reduxjs/toolkit");

const url = process.env.REACT_APP_API_BASE_URL;

const testimonialSlice = createSlice({

    name: "testimonial",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
        status: true,
    },
    reducers: {

        //Set-info
        testimonialPending: (state) => {
            state.loading = true;
        },
        testimonialSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            // localStorage.setItem("token", state.token);
        },
        testimonialFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },
    },

})


//Testimonial

export const { testimonialPending, testimonialSuccess, testimonialFailure } = testimonialSlice.actions;

export const Testimoniald = (token) => async (dispatch) => {

    dispatch(testimonialPending());
    try {

        const { data } = await axios.post(`${url}/admin/gettestimonial`, { token });

        if (data.status === 1)
            dispatch(testimonialSuccess(data));
        else
            dispatch(testimonialFailure(data));
    } catch (error) {
        logoutIfInvalidToken(error.response)
        dispatch(testimonialFailure(error.response.data));
    }
};

export default testimonialSlice.reducer;