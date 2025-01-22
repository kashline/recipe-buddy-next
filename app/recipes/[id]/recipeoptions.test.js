import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import RecipeOptions from "./recipeoptions";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("recipeoptions", () => {
  it("renders the options div", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <RecipeOptions recipeId={259} favorited={true} />
        </UserProvider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
