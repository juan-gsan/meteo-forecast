import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { AppRoutes } from "./App.routes";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";

describe("Given an AppRoutes component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });
  describe("When it is instantiated", () => {
    beforeEach(async () => {
      await act(async () =>
        render(
          <Router initialEntries={["/"]} initialIndex={0}>
            <Provider store={mockStore}>
              <AppRoutes></AppRoutes>
            </Provider>
          </Router>
        )
      );
    });
    test("Then it should render Home", () => {
      const element = screen.getByText("MeteoForecast");
      expect(element).toBeInTheDocument();
    });
  });
});
