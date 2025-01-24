import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import RecipeCard from "./RecipeCard";
import { UserProvider } from "@auth0/nextjs-auth0/client";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecipeCard", () => {
  it("renders a recipe card", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <RecipeCard
            data={{
              title: "15-minute chicken & halloumi burgers",
              difficulty: "medium",
              id: 259,
              length: "long",
              video: "false",
              image:
                "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg",
            }}
          />
        </UserProvider>,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
