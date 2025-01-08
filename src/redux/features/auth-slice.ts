import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES } from "@/types/response-type";
import api from "@/common/network/api";
import { UserModel } from "@/types/auth";
import { ObjectStringAny } from "@/types/types";
import { removeUserLocal, setUserLocal } from "@/common/utils/cookie-manager";
import { redirect } from "next/navigation";
import Routes from "@/common/constants/routes";
import { replaceToEnglishNumber } from "@/common/helper/format-helper";

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
      type,
      mobile: replaceToEnglishNumber(mobile),
      ...(nationalCode && { nationalCode: replaceToEnglishNumber(nationalCode) }),
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
        type,
        mobile: replaceToEnglishNumber(mobile),
        otpCode: replaceToEnglishNumber(otpCode),
        ...(nationalCode && { nationalCode: replaceToEnglishNumber(nationalCode) }),
      }
    );
    return { ...(response.data as ObjectStringAny), phoneNumber: mobile };
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
    setInitailLoginState: (state) => {
      state.getOtpState = FETCHING_STATES.IDLE;
    },
    logout: (state) => {
      removeUserLocal();
      state.user = null;
      state.getOtpState = FETCHING_STATES.IDLE;
      state.verifyOtpState = FETCHING_STATES.IDLE;
      redirect(Routes.loginPage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtp.pending, (state) => {
        state.getOtpState = FETCHING_STATES.FETCHING;
        state.verifyOtpState = FETCHING_STATES.IDLE;
      })
      .addCase(fetchOtp.fulfilled, (state) => {
        state.getOtpState = FETCHING_STATES.READY;
      })
      .addCase(fetchOtp.rejected, (state) => {
        state.getOtpState = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpState = FETCHING_STATES.FETCHING;
        state.getOtpState = FETCHING_STATES.IDLE;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        if ((payload as ObjectStringAny)["isSuccess"]) {
          state.verifyOtpState = FETCHING_STATES.READY;
          const user = payload as UserModel;
          setUserLocal({
            userId: user.userId,
            clinicId: user.clinicId,
            clinicName: user.clinicName,
            fullname: user.fullname,
            patientCode: user.patientCode,
            phoneNumber: user.phoneNumber,
          });
        } else {
          state.verifyOtpState = FETCHING_STATES.FAILED;
        }
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.verifyOtpState = FETCHING_STATES.FAILED;
      });
  },
});

export const { logout, setInitailLoginState } = authSlice.actions;

export default authSlice.reducer;
