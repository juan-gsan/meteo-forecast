import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";

describe("Given an App component", () => {
  describe("When it is instantiated", () => {
    render(<App></App>);
    test("Then it should be in the document", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
