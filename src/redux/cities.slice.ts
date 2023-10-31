import { createSlice } from "@reduxjs/toolkit";
import { City } from "../models/city";
import { loadAsyncCity as loadAsyncCities } from "./thunks";

export type CitiesState = {
  cities: City[];
  status: "idle" | "loading" | "failed";
};

const initialState: CitiesState = {
  cities: [] as City[],
  status: "idle",
};

const sliceCities = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAsyncCities.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.cities = payload;
      })
      .addCase(loadAsyncCities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const acc = sliceCities.actions;
export default sliceCities.reducer;
