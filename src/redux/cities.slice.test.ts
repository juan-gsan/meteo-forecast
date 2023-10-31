import "@testing-library/jest-dom";
import { City } from "../models/city";
import cityReducer, { CitiesState } from "./cities.slice";
import { loadAsyncCities } from "./thunks";
import { CityRepo } from "../services/city.repo";

describe("Given a cities.slice", () => {
  const initialState: CitiesState = {
    cities: [] as City[],
    status: "idle",
  };

  const cityRepo = new CityRepo("test");
  const mockPayload = [{ name: "test" } as City];

  describe("When it dispatches loadAsyncCity", () => {
    test("Then it should handle pending status", () => {
      const mockStatus = cityReducer(
        initialState,
        loadAsyncCities.pending("test", {
          repo: cityRepo,
          cityName: "test",
        })
      );
      expect(mockStatus.status).toEqual("loading");
    });

    test("Then it should handle fulfilled status", () => {
      const mockStatus = cityReducer(
        initialState,
        loadAsyncCities.fulfilled(mockPayload, "test", {
          repo: cityRepo,
          cityName: "test",
        })
      );
      expect(mockStatus.status).toEqual("idle");
      expect(mockStatus.cities).toEqual(mockPayload);
    });

    test("Then it should handle rejected status", () => {
      const mockError = new Error();
      const mockStatus = cityReducer(
        initialState,
        loadAsyncCities.rejected(mockError, "test", {
          repo: cityRepo,
          cityName: "test",
        })
      );
      expect(mockStatus.status).toEqual("failed");
    });
  });
});
