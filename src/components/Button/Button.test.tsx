import * as React from "react";
import renderer from "react-test-renderer";
import { Button, IButtonProps } from "./Button";

describe("Button", () => {
  it("renders the component correctly", () => {
    const props: IButtonProps = {
      active: false,
      backgroundColor: "#3f3f3f",
      buttonDiameter: 40,
      vibrate: false,
      vibrateDuration: 50,
      x: 0,
      y: 0,
    };

    expect(renderer.create(<Button {...props} />).toJSON()).toMatchSnapshot();
  });
});
