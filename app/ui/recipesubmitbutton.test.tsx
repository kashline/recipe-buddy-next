import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import RecipeSubmitButton from "./recipesubmitbutton";
import { StoreProvider } from "../StoreProvider";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecipeSubmitButton", () => {
  it("renders the RecipeSubmitButton component", async () => {
    const component = await act(async () => {
      render(
        <StoreProvider>
          <RecipeSubmitButton />
        </StoreProvider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
