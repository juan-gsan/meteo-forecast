import { createAsyncThunk } from "@reduxjs/toolkit";
import { CityRepo } from "../services/city.repo";
import { City } from "../models/city";
import { Weather } from "../models/weather";
import { WeatherRepo } from "../services/weather.repo";

export const loadAsyncCity = createAsyncThunk<
  City[],
  { repo: CityRepo; cityName: string }
>("cities/load", async ({ repo, cityName }) => {
  return await repo.getCities(cityName);
});

export const loadAsyncWeather = createAsyncThunk<
  Weather,
  { repo: WeatherRepo; lat: string; long: string; timezone: string }
>("weather/load", async ({ repo, lat, long, timezone }) => {
  return await repo.getWeatherByCity(lat, long, timezone);
});
