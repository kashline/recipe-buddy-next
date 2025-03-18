import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Login from "./login";

describe("Login", () => {
  it("renders the Login component", async () => {
    const component = await act(async () => {
      render(<Login />);
    });
    expect(component).toMatchSnapshot();
  });
});
