import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import RecipeStepsForm from "./RecipeStepsForm";
import { StoreProvider } from "@/app/StoreProvider";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: () => ({
    get: () => {},
  }),
  usePathname: () => "",
}));

describe("RecipeStepsForm", () => {
  it("renders the RecipeStepsForm component", async () => {
    const component = await act(async () => {
      render(
        <StoreProvider>
          <RecipeStepsForm />
        </StoreProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
