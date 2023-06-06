import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const url = process.env.REACT_APP_API_BASE_URL;
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
  dispatch(questiontypePending());
  try {
    const { data } = await axios.get(
      `${url}/admin/getquestiontypefortiming`,
      token
    );

    if (data.status === 1) {
      dispatch(questiontypeSuccess(data));
    } else {
      dispatch(questiontypeFailure(data));
    }
  } catch (error) {
    logoutIfInvalidToken(error.response)
    dispatch(questiontypeFailure(error.response.data));
  }
};

export default questiontypeTimeSlice.reducer;
