import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import IngredientsTable from "./ingredientstable";

describe("IngredientsTable", () => {
  it("renders the IngredientsTable dropdown", async () => {
    const component = await act(async () => {
      render(
        <IngredientsTable
          data={[
            `{"name":"Water","quantity":"30 minutes","unit":"soaking"}`,
            '{"name":"Basmati Rice","quantity":"2 cups","unit":"cups"}',
          ]}
        />,
      );
    });
    expect(component).toMatchSnapshot();
  });
});
