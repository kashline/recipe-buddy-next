import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from './page'

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  },
  useSearchParams: () => ({
    get: () => {}
  })
}));

describe("RecipeCard", () => {
  it("renders the recipe details page", () => {
    const component = render(<Page/>);
    expect(component).toMatchSnapshot()
  });
});
