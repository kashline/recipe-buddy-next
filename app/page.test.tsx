import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renders a heading", async () => {
    await act(async () => {
      render(<Page />);
    });
  });
});
