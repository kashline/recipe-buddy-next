import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Page from "./page";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("Page", () => {
  it("renders a heading", async () => {
    await act(async () => {
      render(
        <UserProvider>
          <Page />
        </UserProvider>
      );
    })
    
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("intro")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
