import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const getQuestiontimeSlice = createSlice({
  name: "gettiming",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    gettimingPending: (state) => {
      state.loading = true;
    },
    gettimingSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    gettimingFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.status = 0;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const { gettimingPending, gettimingFailure, gettimingSuccess } =
  getQuestiontimeSlice.actions;

export const gettimingApi = (token) => async (dispatch) => {
  console.log(token);
  dispatch(gettimingPending());
  try {
    const { data } = await axios.get(
      `https://vaidik-backend.onrender.com/admin/setquestiontiming`,
      token
    );

    if (data.status === 1) {
      dispatch(gettimingSuccess(data));
    } else {
      dispatch(gettimingFailure(data));
    }
  } catch (error) {
    logoutIfInvalidToken(error.response)
    dispatch(gettimingFailure(error.response.data));
  }
};

export default getQuestiontimeSlice.reducer;
