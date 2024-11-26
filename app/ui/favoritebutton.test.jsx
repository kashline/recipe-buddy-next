import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("FavoriteButton", () => {
  it("renders the favorite button", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <FavoriteButton recipeId={259} favorited={true} />
        </UserProvider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
