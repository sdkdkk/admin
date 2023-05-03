import { createSlice } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { signinAPI } from "./signinAPI";

export const signinSlice = createSlice({
  name: "signin",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    signinStart: (state) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure } = signinSlice.actions;

export const signin = (username, password) => async (dispatch) => {
  dispatch(signinStart());

  try {
    const response = await signinAPI(username, password);
    dispatch(signinSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Redirect the user to the sign-in page if the refresh token is invalid
      const history = useHistory();
      history.push("/signin");
    } else {
      dispatch(signinFailure(error.message));
    }
  }
};

export const selectUser = (state) => state.signin.user;
export const selectError = (state) => state.signin.error;
export const selectIsLoading = (state) => state.signin.isLoading;

export default signinSlice.reducer;
