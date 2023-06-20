import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASE_URL;

const tutorpaynowSlice = createSlice({
  name: "tutorpaynow",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    tutorpaynowPending: (state) => {
      state.loading = true;
    },
    tutorpaynowSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    tutorpaynowFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.status = 0;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const {tutorpaynowPending, tutorpaynowSuccess,tutorpaynowFailure} = tutorpaynowSlice.actions;

export const tutorpaynowApi = (paymentId, tutorId) => async (dispatch) => {
  dispatch(tutorpaynowPending());
  try {
    const { data } = await axios.post(
      `${url}/admin/tutorpayment/${tutorId}`,paymentId
    );

    if (data.status === 1) {
      toast.success(data.message)
      dispatch(tutorpaynowSuccess(data));
    } else {
      dispatch(tutorpaynowFailure(data));
    }
  } catch (error) {
    toast.success(error.response.data.error)
    dispatch(tutorpaynowFailure(error.response.data.error));
  }
};

export default tutorpaynowSlice.reducer;
