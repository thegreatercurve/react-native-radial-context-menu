import * as React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import { Menu } from "./Menu";

describe("Menu", () => {
  it("renders the component correctly", () => {
    const props = {
      backgroundColor: "#3f3f3f",
      buttonDiameter: 40,
      buttons: [
        { component: () => <Text>1</Text>, value: "one" },
        { component: () => <Text>2</Text>, value: "two" },
        { component: () => <Text>3</Text>, value: "three" },
      ],
      coords: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
      menuDiameter: 80,
      selected: 0,
      vibrate: false,
      vibrateDuration: 50,
      x: 0,
      y: 0,
    };

    expect(renderer.create(<Menu {...props} />).toJSON()).toMatchSnapshot();
  });
});
