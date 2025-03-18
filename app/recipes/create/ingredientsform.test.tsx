import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import IngredientsForm from "./IngredientsForm";
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

describe("IngredientsForm", () => {
  it("renders the IngredientsForm component", async () => {
    const component = await act(async () => {
      render(
        <StoreProvider>
          <IngredientsForm />
        </StoreProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
