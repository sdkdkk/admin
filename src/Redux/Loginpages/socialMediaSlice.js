import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const socialMediaSlice = createSlice({
  name: "socialmedia",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    socialmediaPending: (state) => {
      state.loading = true;
    },
    socialmediaSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    socialmediaFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.status = 0;
      state.user = null;
      state.error = payload;
    },
  },
});

//Testimonial

export const { socialmediaPending, socialmediaSuccess, socialmediaFailure } =
  socialMediaSlice.actions;

export const socialmediaApi = (token) => async (dispatch) => {
  console.log(token);
  dispatch(socialmediaPending());
  try {
    const { data } = await axios.post(
      `https://vaidik-backend.onrender.com/admin/socialmedia`,
      token
    );

    if (data.status === 1) {
      dispatch(socialmediaSuccess(data));
    } else {
      dispatch(socialmediaFailure(data));
    }
  } catch (error) {
    dispatch(socialmediaFailure(error.response.data));
  }
};

export default socialMediaSlice.reducer;
