import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { loadAsyncCities, loadAsyncWeather } from "../redux/thunks";
import { CityRepo } from "../services/city.repo";
import { WeatherRepo } from "../services/weather.repo";
import { City } from "../models/city";

describe("Given a thunks file", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  const url = "test";
  const cityRepo = new CityRepo(url);
  const weatherRepo = new WeatherRepo(url);

  const cityData = {
    name: "TestCityName",
  } as City;

  const weatherData = {
    lat: "12.34",
    long: "56.78",
    timezone: "TestTimezone",
  };

  cityRepo.getCities = jest.fn().mockResolvedValue(cityData);
  weatherRepo.getWeatherByCity = jest.fn().mockResolvedValue(weatherData);

  describe("When loadAsyncCity is called", () => {
    it("Should call the cityRepo", async () => {
      const cityName = "TestCityName";

      const store = mockStore;
      await store.dispatch(loadAsyncCities({ repo: cityRepo, cityName }));

      await expect(cityRepo.getCities).toHaveBeenCalled();
    });
  });

  describe("When loadAsyncWeather is called", () => {
    it("Should call the weatherRepo", async () => {
      const lat = "12.34";
      const long = "56.78";
      const timezone = "TestTimezone";

      const store = mockStore;
      await store.dispatch(
        loadAsyncWeather({
          repo: weatherRepo,
          lat: lat,
          long: long,
          timezone: timezone,
        })
      );

      await expect(weatherRepo.getWeatherByCity).toHaveBeenCalled();
    });
  });
});
