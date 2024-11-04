import { act, render } from "@testing-library/react";
import Page from "../app/page";
import { UserProvider } from "@auth0/nextjs-auth0/client";

it("renders homepage unchanged", async () => {
  const { container } = await act(async () => {
    return render(
      <UserProvider>
        <Page />
      </UserProvider>
    );
  })

  expect(container).toMatchSnapshot();
});
