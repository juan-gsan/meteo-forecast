import { createSlice } from "@reduxjs/toolkit";
import { City } from "../models/city";
import { loadAsyncCity } from "./thunks";

export type CitiesState = {
  city: City;
  status: "idle" | "loading" | "failed";
};

const initialState: CitiesState = {
  city: {} as City,
  status: "idle",
};

const sliceCities = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAsyncCity.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.city = payload;
      })
      .addCase(loadAsyncCity.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const acc = sliceCities.actions;
export default sliceCities.reducer;
