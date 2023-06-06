import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutIfInvalidToken } from "../../helpers/handleError";
const url = process.env.REACT_APP_API_BASE_URL;
const questiontypePriceSlice = createSlice({
  name: "questiontypeprice",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    status: true,
  },
  reducers: {
    //Set-info
    questiontypepricePending: (state) => {
      state.loading = true;
    },
    questiontypepriceSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.status = 1;
      state.user = payload;
      state.token = payload.token;
      state.error = null;
      // localStorage.setItem("token", state.token);
    },
    questiontypepriceFailure: (state, { payload }) => {
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
  questiontypepricePending,
  questiontypepriceSuccess,
  questiontypepriceFailure,
} = questiontypePriceSlice.actions;

export const questiontypePriceApi = () => async (dispatch) => {
  dispatch(questiontypepricePending());
  try {
    const { data } = await axios.get(
      `${url}/admin/getquestiontypeforpricing`
    );

    if (data.status === 1) {
      dispatch(questiontypepriceSuccess(data));
    } else {
      dispatch(questiontypepriceFailure(data));
    }
  } catch (error) {
    logoutIfInvalidToken(error.response)
    dispatch(questiontypepriceFailure(error.response.data));
  }
};

export default questiontypePriceSlice.reducer;
