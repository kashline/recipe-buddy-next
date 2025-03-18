import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Pagination from "./pagination";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: () => ({
    get: () => {},
  }),
  usePathname: () => "",
}));

describe("Pagination", () => {
  it("renders the Pagination component", async () => {
    const component = await act(async () => {
      render(<Pagination totalPages={1} />);
    });
    expect(component).toMatchSnapshot();
  });
});
