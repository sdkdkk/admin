import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { logoutIfInvalidToken } from "../../helpers/handleError";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const getWalletData = createAsyncThunk(
  "admin/adminwallet",
  async (params, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`https://vaidik-backend.onrender.com/api/v1/admin/adminwallet${params}`, { token });
        return response.data;
    } catch (error) {
      logoutIfInvalidToken(error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const getWalletDataSlice = createSlice({
  name: "getWalletData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [getWalletData.pending]: (state) => {
      state.isLoading = true;
    },
    [getWalletData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getWalletData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export const { reset } = getWalletDataSlice.actions;
export default getWalletDataSlice.reducer;
