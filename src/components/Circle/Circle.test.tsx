import * as React from "react";
import renderer from "react-test-renderer";
import { Circle, ICircleProps } from "./Circle";

describe("Circle", () => {
  it("renders the component correctly", () => {
    const props: ICircleProps = {
      style: {},
    };

    expect(renderer.create(<Circle {...props} />).toJSON()).toMatchSnapshot();
  });
});
