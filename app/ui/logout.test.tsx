import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Logout from "./logout";

describe("Logout", () => {
  it("renders the Logout component", async () => {
    const component = await act(async () => {
      render(<Logout />);
    });
    expect(component).toMatchSnapshot();
  });
});
