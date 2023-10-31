import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "./Home";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useCities } from "../hooks/use.cities";

jest.mock("../hooks/use.cities", () => ({
  useCities: jest.fn().mockReturnValue({
    handleLoadCities: jest.fn(),
    cities: [{ name: "New York", id: 1 }],
  }),
}));

describe("Given a Home component", () => {
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
            <Home></Home>
          </Provider>
        </Router>
      );
    });
  });

  describe("When it is instantiated", () => {
    test("Then it should be in the document", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When the user submit the form", () => {
    test("Then handleLoadCity should have been called", async () => {
      const button = screen.getByRole("button");
      const form = screen.getByRole("form");
      await userEvent.click(button);
      await fireEvent.submit(form);
      expect(useCities().handleLoadCities).toHaveBeenCalled();
      expect(useCities().cities).toEqual([{ name: "New York", id: 1 }]);
    });
  });

  describe("When the user changes the input", () => {
    test("Then setFormState should have been called", async () => {
      const input = screen.getByPlaceholderText(
        "Search location..."
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: "New York" } });

      expect(input.value).toBe("New York");
    });
  });
});
