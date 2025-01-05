import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES, IClientResponseState } from "@/types/response-type";
import api from "@/common/network/api";
import { Role } from "@prisma/client";
import { UserModel } from "@/backend/models/auth";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await api.get("/user");
  return response.data;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ firstname, lastname }: { firstname: string | null; lastname: string | null }) => {
    const response = await api.put("/user", {
      firstname,
      lastname,
    });
    return response.data;
  }
);

export const fetchUserRoles = createAsyncThunk("fetchUserRoles", async () => {
  const response = await api.get("/user/roles");
  return response.data;
});

const initialState: {
  roles: IClientResponseState<Array<Role>>;
  user: IClientResponseState<UserModel | null>;
  updateUser: IClientResponseState<null>;
} = {
  user: {
    data: null,
    state: FETCHING_STATES.IDLE,
    message: null,
  },
  roles: {
    data: [],
    state: FETCHING_STATES.IDLE,
    message: null,
  },
  updateUser: {
    data: null,
    state: FETCHING_STATES.IDLE,
    message: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.roles.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchUserRoles.fulfilled, (state, { payload }) => {
        state.roles.data = payload as Role[];
        state.roles.state = FETCHING_STATES.READY;
      })
      .addCase(fetchUserRoles.rejected, (state, { error }) => {
        state.roles.message = error?.message ?? "";
        state.roles.state = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user.data = payload as UserModel;
        state.user.state = FETCHING_STATES.READY;
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.user.message = error?.message ?? "";
        state.user.state = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUser.state = FETCHING_STATES.UPDATING;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user.data = payload as UserModel;
        state.updateUser.state = FETCHING_STATES.READY;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.updateUser.message = error?.message ?? "";
        state.updateUser.state = FETCHING_STATES.FAILED;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
