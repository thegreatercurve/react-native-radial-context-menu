import * as React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";
import { withRadialActionMenu } from "./withRadialActionMenu";

describe("withRadialActionMenu", () => {
  it("renders the component correctly", () => {
    const props = {
      buttons: [
        { component: () => <Text>1</Text>, value: "one" },
        { component: () => <Text>2</Text>, value: "two" },
        { component: () => <Text>3</Text>, value: "three" },
      ],
    };
    const WrappedComponent = withRadialActionMenu(() => <View />);

    expect(
      renderer.create(<WrappedComponent {...props} />).toJSON()
    ).toMatchSnapshot();
  });
});
