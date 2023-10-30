import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { WeatherCard } from "./Card";
import { useWeather } from "../hooks/use.weather";

jest.mock("../hooks/use.cities", () => ({
  useCities: jest.fn(),
}));

jest.mock("../hooks/use.weather", () => ({
  useWeather: jest.fn(),
}));

describe("Given a Card component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  describe("When it is instantiated", () => {
    test("Then it should be in the document", () => {
      jest.requireMock("../hooks/use.cities").useCities.mockReturnValue({
        city: {
          name: "Madrid",
          latitude: 123,
          longitude: 123,
          timezone: "test",
        },
      });

      jest.requireMock("../hooks/use.weather").useWeather.mockReturnValue({
        weather: {
          latitude: 123,
          longitude: 123,
          timezone: "test",
          current_weather: {
            weathercode: 200,
            temperature: 25,
            time: "2023-10-23T14:30:00",
          },
          daily: {
            time: ["2023-10-23T14:30:00"],
            weathercode: [3],
            temperature_2m_min: [15],
            temperature_2m_max: [30],
          },
        },
        handleLoadWeather: jest.fn(),
      });
      render(
        <Router>
          <Provider store={mockStore}>
            <WeatherCard></WeatherCard>
          </Provider>
        </Router>
      );

      const element = screen.getByText("city: Madrid");
      expect(element).toBeInTheDocument();
      expect(useWeather().handleLoadWeather).toHaveBeenCalled();
    });
  });

  describe("When it is instantiated and there is no weather", () => {
    test("Then it should render only the city", () => {
      jest.requireMock("../hooks/use.cities").useCities.mockReturnValue({
        city: {
          name: "Madrid",
          latitude: 123,
          longitude: 123,
          timezone: "test",
        },
      });

      jest.requireMock("../hooks/use.weather").useWeather.mockReturnValue({
        weather: {
          latitude: 123,
          longitude: 123,
          timezone: "test",
        },
        handleLoadWeather: jest.fn(),
      });
      render(
        <Router>
          <Provider store={mockStore}>
            <WeatherCard></WeatherCard>
          </Provider>
        </Router>
      );

      const element = screen.getByText("city: Madrid");
      expect(element).toBeInTheDocument();
    });
  });
});
