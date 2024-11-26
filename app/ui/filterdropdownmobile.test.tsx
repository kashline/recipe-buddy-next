import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
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
        <UserProvider>
          <StoreProvider>
            <FilterDropdownMobile />
          </StoreProvider>
        </UserProvider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
