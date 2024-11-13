import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import ProfileButton from "./profilebutton";
import { StoreProvider } from "../StoreProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("ProfileButton", () => {
  it("renders a profile button", async () => {
    const component = await act(async () => render(
      <UserProvider>
        <StoreProvider>
          <ProfileButton />
        </StoreProvider>
      </UserProvider>
    ));
    expect(component).toMatchSnapshot();
  });
});
