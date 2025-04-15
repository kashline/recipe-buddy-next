import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BurgerMenuButton from "./burgermenubutton";
import HomeIcon from "./icons/sidebaricons/homeicon";

describe("BurgerMenuButton", () => {
  it("renders a burger menu button", () => {
    render(
      <BurgerMenuButton
        title="Home"
        href="/"
        Icon={HomeIcon({ fill: "#eee5e9", width: 25, height: 25 })}
      />,
    );
  });
});
