import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { CityCard } from "./City.card";
import { City } from "../models/city";
describe("Given a City.card component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  const mockCity = {
    id: 1,
    name: "name test",
    country: "country test",
  } as City;
  describe("When it is instantiated", () => {
    test("Then it should be in the document", () => {
      render(
        <Router>
          <Provider store={mockStore}>
            <CityCard city={mockCity}></CityCard>
          </Provider>
        </Router>
      );

      const element = screen.getByText("name test");
      expect(element).toBeInTheDocument();
    });
  });
});
