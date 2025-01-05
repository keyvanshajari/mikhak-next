import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES, IClientResponseState } from "@/types/response-type";
import api from "@/common/network/api";
import { CityModel, ProvinceModel } from "@/backend/models/base";

const CURRENT_CITY = "current_city";
export const fetchProvincesCities = createAsyncThunk(
  "fetchProvincesCities",
  async (name: string | null) => {
    const response = await api.get("/base/provinces-cities", {
      ...(name != null && { name }),
    });
    return response.data;
  }
);

const initialState: {
  provincesCities: IClientResponseState<Array<ProvinceModel>>;
  currentCities: Array<CityModel>;
} = {
  provincesCities: {
    data: [],
    state: FETCHING_STATES.IDLE,
    message: null,
  },
  currentCities: [],
};

const city = createSlice({
  name: "city",
  initialState,
  reducers: {
    getCurrentCity(state) {
      const res = localStorage.getItem(CURRENT_CITY);
      if (res) {
        state.currentCities = JSON.parse(res);
      }
    },
    setCurrentCity(state, { payload }: { payload: Array<CityModel> | null }) {
      state.currentCities = payload || [];
      localStorage.setItem(CURRENT_CITY, JSON.stringify(state.currentCities));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvincesCities.pending, (state) => {
        state.provincesCities.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchProvincesCities.fulfilled, (state, { payload }) => {
        state.provincesCities.data = payload as ProvinceModel[];
        state.provincesCities.state = FETCHING_STATES.READY;
      })
      .addCase(fetchProvincesCities.rejected, (state, { error }) => {
        state.provincesCities.message = error?.message ?? "";
        state.provincesCities.state = FETCHING_STATES.FAILED;
      });
  },
});

export const { getCurrentCity, setCurrentCity } = city.actions;

export default city.reducer;
