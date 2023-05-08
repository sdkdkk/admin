import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const questionTimingSlice = createSlice({
  name: "questiontiming",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    questiontimingPending: (state) => {
      state.loading = true;
    },
    questiontimingSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    questiontimingFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.status = 0;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const {
  questiontimingPending,
  questiontimingFailure,
  questiontimingSuccess,
} = questionTimingSlice.actions;

export const questiontimingApi = (token) => async (dispatch) => {
  console.log(token);
  dispatch(questiontimingPending());
  try {
    const { data } = await axios.post(
      `https://vaidik-backend.onrender.com/admin/setquestiontiming`,
      token
    );

    if (data.status === 1) {
      dispatch(questiontimingSuccess(data));
    } else {
      dispatch(questiontimingFailure(data));
    }
  } catch (error) {
    dispatch(questiontimingFailure(error.response.data));
  }
};

export default questionTimingSlice.reducer;
