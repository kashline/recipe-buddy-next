import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import DefaultTopbar from "./defaulttopbar";
import { StoreProvider } from "../StoreProvider";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("FavoriteButton", () => {
  it("renders the favorite button", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <StoreProvider>
            <DefaultTopbar />
          </StoreProvider>
        </UserProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
