import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Page from "../page";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("Profile Recipe Page", () => {
  it("renders the Profile Recipe Page", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <Page />
        </UserProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
