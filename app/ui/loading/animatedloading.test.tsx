import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AnimatedLoading from "./animatedloading";

describe("AnimatedLoading", () => {
  it("renders animatedloading", () => {
    const component = render(<AnimatedLoading name="test" />);
    expect(component).toMatchSnapshot();
  });
});
