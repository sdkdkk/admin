import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const questiontypeTimeSlice = createSlice({
  name: "questiontypetime",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    questiontypePending: (state) => {
      state.loading = true;
    },
    questiontypeSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    questiontypeFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.status = 0;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const { questiontypePending, questiontypeSuccess, questiontypeFailure } =
questiontypeTimeSlice.actions;

export const questiontypeApi = (token) => async (dispatch) => {
  console.log(token);
  dispatch(questiontypePending());
  try {
    const { data } = await axios.get(
      `https://vaidik-backend.onrender.com/admin/getquestiontypefortiming`,
      token
    );

    if (data.status === 1) {
      dispatch(questiontypeSuccess(data));
    } else {
      dispatch(questiontypeFailure(data));
    }
  } catch (error) {
    dispatch(questiontypeFailure(error.response.data));
  }
};

export default questiontypeTimeSlice.reducer;