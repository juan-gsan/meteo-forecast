import "@testing-library/jest-dom";
import { Weather } from "../models/weather";
import weatherReducer, { WeatherState } from "./weather.slice";
import { loadAsyncWeather } from "./thunks";
import { WeatherRepo } from "../services/weather.repo";

describe("Given a weather.slice", () => {
  const initialState: WeatherState = {
    weather: {} as Weather,
    status: "idle",
  };

  const weatherRepo = new WeatherRepo("test");
  const mockPayload = {} as Weather;

  describe("When it dispatches loadAsyncWeather", () => {
    test("Then it should handle pending status", () => {
      const mockStatus = weatherReducer(
        initialState,
        loadAsyncWeather.pending("test", {
          repo: weatherRepo,
          lat: "test",
          long: "test",
          timezone: "test",
        })
      );
      expect(mockStatus.status).toEqual("loading");
    });

    test("Then it should handle fulfilled status", () => {
      const mockStatus = weatherReducer(
        initialState,
        loadAsyncWeather.fulfilled(mockPayload, "test", {
          repo: weatherRepo,
          lat: "test",
          long: "test",
          timezone: "test",
        })
      );
      expect(mockStatus.status).toEqual("idle");
      expect(mockStatus.weather).toEqual(mockPayload);
    });

    test("Then it should handle rejected status", () => {
      const mockError = new Error();
      const mockStatus = weatherReducer(
        initialState,
        loadAsyncWeather.rejected(mockError, "test", {
          repo: weatherRepo,
          lat: "test",
          long: "test",
          timezone: "test",
        })
      );
      expect(mockStatus.status).toEqual("failed");
    });
  });
});
