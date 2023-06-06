import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutIfInvalidToken } from '../../helpers/handleError';
const url = process.env.REACT_APP_API_BASE_URL;
const { createSlice } = require("@reduxjs/toolkit");

// const url = "${url}";

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
            state.isAuthenticated = false;
        },
        testimonialFormSuccess: (state, { payload }) => {
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

    dispatch(testimonialFromPending());
    try {

        const { data } = await axios.post(`${url}/admin/testimonial`, token );

        if (data.status === 1){
            toast.success(data.message);
            dispatch(testimonialFormSuccess(data));
        }
        else{
            dispatch(testimonialFormFailure(data));
        }
    } catch (error) {
        logoutIfInvalidToken(error.response)
        dispatch(testimonialFormFailure(error.response.data));
    }
};
export default testimonialFormSlice.reducer;