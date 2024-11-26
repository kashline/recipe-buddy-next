import "@testing-library/jest-dom";
import MobileMenuBurger from "./mobilemenuburger";
import { render, act } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("MobileMenuBurger", () => {
  it("renders the mobile menu burger", async () => {
    const component = await act(async () =>
      render(
        <UserProvider>
          <MobileMenuBurger />
        </UserProvider>,
      ),
    );
    expect(component).toMatchSnapshot();
  });
});
