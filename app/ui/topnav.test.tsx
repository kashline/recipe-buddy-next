import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import TopNav from "./topnav";

jest.mock("next/navigation", () => ({
  usePathname: () => "",
}));

describe("TopNav", () => {
  it("renders the TopNav component", async () => {
    const component = await act(async () => {
      render(<TopNav />);
    });
    expect(component).toMatchSnapshot();
  });
});
