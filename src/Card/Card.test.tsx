import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { Card } from "./Card";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
}));

jest.mock("../hooks/use.cities", () => ({
  useCities: jest.fn().mockReturnValue({
    city: { name: "Madrid", latitude: 123, longitude: 123, timezone: "test" },
  }),
}));

jest.mock("../hooks/use.weather", () => ({
  useWeather: jest.fn().mockReturnValue({
    weather: {
      current_weather: {
        weathercode: 200,
        temperature: 25,
        time: "2023-10-23T14:30:00",
      },
      daily: {
        temperature_2m_min: [15],
        temperature_2m_max: [30],
      },
    },
    handleLoadWeather: jest.fn(),
  }),
}));

describe("Given a Card component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  beforeEach(() => {
    act(() => {
      render(
        <Router>
          <Provider store={mockStore}>
            <Card></Card>
          </Provider>
        </Router>
      );
    });
  });

  describe("When it is instantiated", () => {
    test("Then it should be in the document", () => {
      const element = screen.getByText("city: Madrid");
      expect(element).toBeInTheDocument();
    });
  });
});
