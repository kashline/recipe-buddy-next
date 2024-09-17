import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  it("renders a button", () => {
    render(<Button />);
  });
});
