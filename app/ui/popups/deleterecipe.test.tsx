import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DeleteRecipe from "./deleterecipe";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("DeleteRecipe", () => {
  it("renders a DeleteRecipe", () => {
    render(<DeleteRecipe recipeID={1} recipeName="test" />);
  });
});
