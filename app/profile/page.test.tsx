import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Page from "../page";

describe("Profile Page", () => {
  it("renders the Profile Page", async () => {
    const component = await act(async () => {
      render(<Page />);
    });
    expect(component).toMatchSnapshot();
  });
});
