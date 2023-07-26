import { createSlice } from "@reduxjs/toolkit";
import { City } from "../models/city";
import { loadAsyncCity } from "./thunks";

export type CitiesState = {
  city: City;
};

const initialState: CitiesState = {
  city: {} as City,
};

const sliceCities = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAsyncCity.fulfilled, (state, { payload }) => {
      state.city = payload;
    });
  },
});

export const ac = sliceCities.actions;
export default sliceCities.reducer;
