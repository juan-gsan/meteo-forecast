import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { AppRoutes } from "./App.routes";
import { render, screen, act } from "@testing-library/react";

describe("Given an AppRoutes component", () => {
  describe("When it is instantiated", () => {
    const MockHomeComponent = jest.fn().mockReturnValue(<h1>Home</h1>);
    jest.mock("../Home/Home", () => MockHomeComponent);

    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        )
      );
    });

    const element = screen.getByText("Home");

    test("Then it should be in the document", () => {
      expect(MockHomeComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
