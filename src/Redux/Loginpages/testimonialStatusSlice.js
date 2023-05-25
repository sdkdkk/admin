import axios from "axios";
import { toast } from "react-toastify";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const { createSlice } = require("@reduxjs/toolkit");

const url = "https://vaidik-backend.onrender.com/api/v1";

const testimonialStatusSlice = createSlice({
  name: "testimonialstatus",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    testimonialStatusPending: (state) => {
      state.loading = true;
    },
    testimonialStatusSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    testimonialStatusFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const {
  testimonialStatusPending,
  testimonialStatusSuccess,
  testimonialStatusFailure,
} = testimonialStatusSlice.actions;

export const Statuschange = (status, id) => async (dispatch) => {

  const token = localStorage.getItem("token");

  dispatch(testimonialStatusPending());
  try {
    const { data } = await axios.post(`${url}/admin/testimonialstatus/${id}`, {
      token,status
    });

    if (data.status === 1) {
      toast.success(data.message);
      dispatch(testimonialStatusSuccess(data));
    } else dispatch(testimonialStatusFailure(data));
  } catch (error) {
    logoutIfInvalidToken(error.response);
    dispatch(testimonialStatusFailure(error));
  }
};

export default testimonialStatusSlice.reducer;
