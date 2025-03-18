import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown", () => {
  it("renders the FilterDropdown component", async () => {
    const component = await act(async () => {
      render(<FilterDropdown />);
    });
    expect(component).toMatchSnapshot();
  });
});
