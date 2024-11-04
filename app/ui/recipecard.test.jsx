import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RecipeCard from './RecipeCard'

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe("RecipeCard", () => {
  it("renders a recipe card", () => {
    const component = render(<RecipeCard data={{
        name: "15-minute chicken & halloumi burgers",
        difficulty: 'medium',
        id: 259,
        length: 'long',
        video: 'false',
        image: 'https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg'
    }}/>);
    expect(component).toMatchSnapshot()
  });
});
