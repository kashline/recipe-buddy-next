import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import FilterDropdownMobile from "./filterdropdownmobile";
import { StoreProvider } from "../StoreProvider";

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

describe("FilterDropdownMobile", () => {
  it("renders the mobile filter dropdown", async () => {
    const component = await act(async () => {
      render(
        <StoreProvider>
          <FilterDropdownMobile />
        </StoreProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
