import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import RecipeGrid from "./RecipeGrid";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecipeGrid", () => {
  it("renders the RecipeGrid component", async () => {
    const component = await act(async () => {
      render(
        <UserProvider>
          <RecipeGrid
            data={[
              {
                title: "15-minute chicken & halloumi burgers",
                difficulty: "medium",
                id: 259,
                length: "long",
                video: "false",
                image:
                  "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg",
              },
            ]}
          />
        </UserProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
