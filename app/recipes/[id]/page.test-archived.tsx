import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "./page";
import { TextEncoder, TextDecoder } from 'util';

// I believe we're running into issues using async helmet and jest, might be related to https://github.com/jsdom/jsdom/issues/1724

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecipeCard", () => {
  it("renders the recipe details page", () => {
    Object.assign(global, { TextDecoder, TextEncoder });
    const component = render(<Page params={{ id: "12" }} />);
    expect(component).toMatchSnapshot();
  });
});
