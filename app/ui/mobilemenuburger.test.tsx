import "@testing-library/jest-dom";
import MobileMenuBurger from "./mobilemenuburger";
import { render } from "@testing-library/react";

describe("MobileMenuBurger", () => {
  it("renders a recipe card", () => {
    const component = render(<MobileMenuBurger/>);
    expect(component).toMatchSnapshot()
  });
});
