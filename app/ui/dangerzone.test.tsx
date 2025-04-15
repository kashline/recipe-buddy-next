import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DangerZone from "./dangerzone";

describe("DangerZone", () => {
  it("renders a dangerzone component", () => {
    render(<DangerZone recipeID={1} recipeName="Test" />);
  });
});
