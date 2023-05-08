import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const questionPricingSlice = createSlice({
  name: "questionpricing",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    questionpricingPending: (state) => {
      state.loading = true;
    },
    questionpricingSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    questionpricingFailure: (state, { payload }) => {
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
  questionpricingPending,
  questionpricingSuccess,
  questionpricingFailure,
} = questionPricingSlice.actions;

export const questionpricingApi = (token) => async (dispatch) => {
  console.log(token);
  dispatch(questionpricingPending());
  try {
    const { data } = await axios.post(
      `https://vaidik-backend.onrender.com/admin/setquestionpricing`,
      token
    );

    if (data.status === 1) {
      dispatch(questionpricingSuccess(data));
    } else {
      dispatch(questionpricingFailure(data));
    }
  } catch (error) {
    dispatch(questionpricingFailure(error.response.data));
  }
};

export default questionPricingSlice.reducer;
