import { createSlice } from "@reduxjs/toolkit";
import { Weather } from "../models/weather";
import { loadAsyncWeather } from "./thunks";

export type WeatherState = {
  weather: Weather;
  status: "idle" | "loading" | "failed";
};

const initialState: WeatherState = {
  weather: {} as Weather,
  status: "idle",
};

const sliceWeather = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAsyncWeather.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.weather = payload;
      })
      .addCase(loadAsyncWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const acw = sliceWeather.actions;
export default sliceWeather.reducer;
