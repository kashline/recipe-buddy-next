import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Search from "./search";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => {},
  }),
}));

describe("Search", () => {
  it("renders the Search component", async () => {
    const component = await act(async () => {
      render(<Search state="" setState={() => {}} placeholder="" />);
    });
    expect(component).toMatchSnapshot();
  });
});
