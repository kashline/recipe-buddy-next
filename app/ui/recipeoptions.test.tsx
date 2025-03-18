import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import RecipeOptions from "./recipeoptions";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { RecipeMock } from "./recipequickinfo.test";
import { StoreProvider } from "../StoreProvider";

describe("recipeoptions", () => {
  it("renders the options div", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <StoreProvider>
            <RecipeOptions recipe={RecipeMock} favorited={true} />
          </StoreProvider>
        </UserProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
