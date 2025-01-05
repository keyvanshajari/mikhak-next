import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES, IClientResponseState } from "@/types/response-type";
import api from "@/common/network/api";

export const fetchGetOtp = createAsyncThunk("fetchGetOtp", async (username: string) => {
  const response = await api.post("/auth/getOtp", {
    username,
  });

  return response.data;
});

const initialState: IClientResponseState<any> = {
  data: [],
  state: FETCHING_STATES.IDLE,
  message: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOtp.pending, (state) => {
        state.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchGetOtp.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.state = FETCHING_STATES.READY;
      })
      .addCase(fetchGetOtp.rejected, (state, { error }) => {
        state.message = error?.message ?? "";
        state.state = FETCHING_STATES.FAILED;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
