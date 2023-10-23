import { useWeather } from "./use.weather";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../redux/cities.slice";
import weatherReducer from "../redux/weather.slice";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Given a useCities custom hook", () => {
  const mockStore = configureStore({
    reducer: {
      cities: cityReducer,
      weather: weatherReducer,
    },
  });

  const mockDispatch = jest.fn();
  mockStore.dispatch = mockDispatch;

  function MockComponent() {
    const { handleLoadWeather } = useWeather();

    return (
      <>
        <button
          onClick={() => handleLoadWeather("test", "test", "test")}
        ></button>
      </>
    );
  }

  describe("When handleLoadWeather is called", () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <MockComponent></MockComponent>
        </Provider>
      </MemoryRouter>
    );
    test("Then it should dispatch loadAsyncWeather", async () => {
      const element = screen.getByRole("button");
      await userEvent.click(element);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
