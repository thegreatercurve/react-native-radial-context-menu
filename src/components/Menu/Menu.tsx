import * as React from "react";
import { View } from "react-native";
import { Button } from "../Button";
import { Circle } from "../Circle";
import { styles } from "../../styles";
import { getSizeStyles } from "../../utils";

export interface IMenuProps {
  backgroundColor: string;
  buttonDiameter: number;
  buttons: IButton[];
  coords: ICoordinate[];
  menuDiameter: number;
  selected: number | null;
  vibrate: boolean;
  vibrateDuration: number;
  x: number;
  y: number;
}

export interface IMenuState {
  open: boolean;
}

export class Menu extends React.Component<IMenuProps, IMenuState> {
  private constructor(props: IMenuProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  public render(): React.ReactNode {
    const {
      coords,
      backgroundColor,
      buttons,
      buttonDiameter,
      menuDiameter,
      selected,
      vibrate,
      vibrateDuration,
      x,
      y,
    } = this.props;

    return (
      <View
        style={[styles.menu, getSizeStyles(menuDiameter), { left: x, top: y }]}
      >
        <Circle style={{ backgroundColor, ...getSizeStyles(menuDiameter) }} />
        <View style={[styles.list, getSizeStyles(buttonDiameter)]}>
          {buttons.map(({ component }: IButton, i: number) => (
            <Button
              active={selected === i}
              backgroundColor={backgroundColor}
              buttonDiameter={buttonDiameter}
              key={i}
              vibrate={vibrate}
              vibrateDuration={vibrateDuration}
              x={coords[i].x}
              y={coords[i].y}
            >
              {component()}
            </Button>
          ))}
        </View>
      </View>
    );
  }
}
