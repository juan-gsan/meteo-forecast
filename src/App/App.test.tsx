import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { City } from "../models/city";
import { Weather } from "../models/weather";
import { MemoryRouter as Router } from "react-router-dom";

describe("Given an App component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
    preloadedState: {
      cities: {
        city: {} as City,
        status: "idle",
      },
      weather: {
        weather: {} as Weather,
        status: "idle",
      },
    },
  });
  describe("When it is instantiated", () => {
    render(
      <Router>
        <Provider store={mockStore}>
          <App></App>
        </Provider>
      </Router>
    );
    test("Then it should be in the document", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
