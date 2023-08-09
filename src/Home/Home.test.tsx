import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormState, Home } from "./Home";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
describe("Given a Home component", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  const mockSetFormState = jest.fn();
  const mockFormState = { name: "test" } as FormState;

  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: (initialValue: FormState) => [
      initialValue || mockFormState,
      mockSetFormState,
    ],
  }));

  describe("When it is instantiated", () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={mockStore}>
            <Home></Home>
          </Provider>
        </Router>
      );
    });

    test("Then it should be in the document", () => {
      const element = screen.getByRole("textbox");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When the user changes the input", () => {
    test("Then setFormState should have been called", async () => {
      const element = screen.getByRole("textbox");
      await userEvent.type(element, "test");
      expect(mockSetFormState).toHaveBeenCalled();
    });
  });
});
