import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecipeCard", () => {
  it("renders the recipe details page", () => {
    const component = render(
      <Page
        params={{
          id: "12",
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
