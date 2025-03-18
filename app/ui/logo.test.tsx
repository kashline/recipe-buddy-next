import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Logo from "./logo";

describe("Logo", () => {
  it("renders the Logo component", async () => {
    const component = await act(async () => {
      render(<Logo />);
    });
    expect(component).toMatchSnapshot();
  });
});
