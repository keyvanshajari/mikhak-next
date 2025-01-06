import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES } from "@/types/response-type";
import api from "@/common/network/api";
import { setLocalStorageData } from "@/common/utils/storage";
import { UserModel } from "@/types/auth";
import { ObjectStringAny } from "@/types/types";

export const fetchOtp = createAsyncThunk(
  "fetchOtp",
  async ({
    mobile,
    type,
    nationalCode,
  }: {
    mobile: string;
    type: number;
    nationalCode?: string;
  }) => {
    const response = await api.get("/userotpreq", {
      mobile,
      type,
      ...(nationalCode && { nationalCode }),
    });

    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({
    mobile,
    type,
    nationalCode,
    otpCode,
  }: {
    mobile: string;
    type: number;
    nationalCode?: string;
    otpCode: string;
  }) => {
    const response = await api.post(
      "/userotp",
      {},
      {
        mobile,

        type,
        otpCode,
        ...(nationalCode && { nationalCode }),
      }
    );
    return response.data;
  }
);

const initialState: {
  getOtpState: FETCHING_STATES;
  verifyOtpState: FETCHING_STATES;
  user: UserModel | null;
} = {
  getOtpState: FETCHING_STATES.IDLE,
  verifyOtpState: FETCHING_STATES.IDLE,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyUser(state, { payload }) {
      console.log(payload);
      state.user = payload;
      setLocalStorageData("user", JSON.stringify(payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtp.pending, (state) => {
        state.getOtpState = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchOtp.fulfilled, (state, { payload }) => {
        state.getOtpState = FETCHING_STATES.READY;
      })
      .addCase(fetchOtp.rejected, (state, { error }) => {
        state.getOtpState = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpState = FETCHING_STATES.FETCHING;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        if ((payload as ObjectStringAny)["isSuccess"]) {
          state.verifyOtpState = FETCHING_STATES.READY;
          verifyUser(payload);
        } else {
          state.verifyOtpState = FETCHING_STATES.FAILED;
        }
      })
      .addCase(verifyOtp.rejected, (state, { error, payload }) => {
        state.verifyOtpState = FETCHING_STATES.FAILED;
      });
  },
});

export const { verifyUser } = authSlice.actions;

export default authSlice.reducer;
