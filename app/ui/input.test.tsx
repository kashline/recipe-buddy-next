import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Input from "./input";
import { setTitle } from "../lib/features/recipe/createRecipeSlice";
import { StoreProvider } from "../StoreProvider";

describe("Input", () => {
  it("renders the Input component", async () => {
    const component = await act(async () => {
      render(
        <StoreProvider>
          <Input label="test" setFunction={setTitle} required={true} />
        </StoreProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
