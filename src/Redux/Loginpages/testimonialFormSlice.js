import axios from 'axios';

const { createSlice } = require("@reduxjs/toolkit");

const url = "https://vaidik-backend.onrender.com";

const testimonialFormSlice = createSlice({

    name: "testimonialform",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
        status: true,
    },
    reducers: {

        //Set-info
        testimonialFromPending: (state) => {
            state.loading = true;
        },
        testimonialFromSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
            state.token = payload.token;
            state.error = null;
            // localStorage.setItem("token", state.token);
        },
        testimonialFormFailure: (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = payload;
        },
    },

})


//Testimonial

export const { testimonialFromPending, testimonialFormSuccess, testimonialFormFailure } = testimonialFormSlice.actions;

export const testimonialformapi = (token) => async (dispatch) => {
    console.log(token);
    dispatch(testimonialFromPending());
    try {

        const { data } = await axios.post(`${url}/admin/testimonial`, token );

        if (data.status === 1)
            dispatch(testimonialFormSuccess(data));
        else
            dispatch(testimonialFormFailure(data));
    } catch (error) {
        dispatch(testimonialFormFailure(error.response.data));
    }
};
export default testimonialFormSlice.reducer;