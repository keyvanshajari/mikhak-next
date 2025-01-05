import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCHING_STATES, IClientResponseState } from "@/types/response-type";
import api from "@/common/network/api";
import { CategoryModel } from "@/backend/models/base";

export const fetchCategories = createAsyncThunk(
  "fetchCateegories",
  async (name?: string | null) => {
    const response = await api.get("/base/categories", {
      ...(name != null && { name }),
    });
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "fetchCateegoriesById",
  async (id: number | null) => {
    const response = await api.get("/base/categories/" + id);
    return response.data;
  }
);

export const fetchCategoriesFilterAttr = createAsyncThunk(
  "fetchCateegoriesFilterAttr",
  async (catId: number) => {
    const response = await api.get("/base/filter/attr/" + catId);
    return response.data;
  }
);

const initialState: {
  categories: IClientResponseState<Array<CategoryModel>>;
  catById: IClientResponseState<CategoryModel | null>;
  filtersAttr: IClientResponseState<CategoryModel | null>;
} = {
  categories: {
    data: [],
    state: FETCHING_STATES.IDLE,
    message: null,
  },
  catById: {
    data: null,
    state: FETCHING_STATES.IDLE,
    message: null,
  },
  filtersAttr: {
    data: null,
    state: FETCHING_STATES.IDLE,
    message: null,
  },
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories.data = payload as CategoryModel[];
        state.categories.state = FETCHING_STATES.READY;
      })
      .addCase(fetchCategories.rejected, (state, { error }) => {
        state.categories.message = error?.message ?? "";
        state.categories.state = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.catById.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchCategoryById.fulfilled, (state, { payload }) => {
        state.catById.data = payload as CategoryModel;
        state.catById.state = FETCHING_STATES.READY;
      })
      .addCase(fetchCategoryById.rejected, (state, { error }) => {
        state.catById.message = error?.message ?? "";
        state.catById.state = FETCHING_STATES.FAILED;
      });

    builder
      .addCase(fetchCategoriesFilterAttr.pending, (state) => {
        state.filtersAttr.state = FETCHING_STATES.FETCHING;
      })
      .addCase(fetchCategoriesFilterAttr.fulfilled, (state, { payload }) => {
        state.filtersAttr.data = payload as CategoryModel;
        state.filtersAttr.state = FETCHING_STATES.READY;
      })
      .addCase(fetchCategoriesFilterAttr.rejected, (state, { error }) => {
        state.filtersAttr.message = error?.message ?? "";
        state.filtersAttr.state = FETCHING_STATES.FAILED;
      });
  },
});

export const {} = categories.actions;

export default categories.reducer;
