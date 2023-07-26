import { createAsyncThunk } from "@reduxjs/toolkit";
import { MeteoRepo } from "../services/meteo.repo";
import { City } from "../models/city";

export const loadAsyncCity = createAsyncThunk<
  City,
  { repo: MeteoRepo; lat: string; long: string; timezone: string }
>("cities/load", async ({ repo, lat, long, timezone }) => {
  return await repo.getCity(lat, long, timezone);
});
