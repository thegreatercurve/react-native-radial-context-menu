import * as React from "react";
import { Animated, Vibration, View } from "react-native";
import { styles } from "../../styles";
import { getSizeStyles } from "../../utils";

export interface IButtonProps {
  active: boolean;
  backgroundColor: string;
  buttonDiameter: number;
  vibrate: boolean;
  vibrateDuration: number;
  x: number;
  y: number;
}

export interface IButtonState {
  hover: boolean;
  pan: Animated.ValueXY;
  scale: Animated.Value;
  touchable: boolean;
}

export class Button extends React.PureComponent<IButtonProps, IButtonState> {
  public constructor(props: IButtonProps) {
    super(props);

    this.state = {
      hover: false,
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      touchable: false,
    };
  }

  public componentDidMount(): void {
    this.openAnimation();
  }

  public componentDidUpdate(prevProps: IButtonProps): void {
    const { active, vibrate, vibrateDuration } = this.props;

    if (active && !prevProps.active) {
      if (vibrate) {
        Vibration.vibrate(vibrateDuration, false);
      }

      this.scaleAnimation(1.2);
    } else if (!active && prevProps.active) {
      this.scaleAnimation(1);
    }
  }

  public render(): React.ReactNode {
    const { backgroundColor, buttonDiameter, children } = this.props;
    const { pan, scale } = this.state;

    return (
      <Animated.View
        style={[
          styles.button,
          { backgroundColor, ...getSizeStyles(buttonDiameter) },
          pan.getLayout(),
          {
            transform: [{ scale }],
          },
        ]}
      >
        <View>{children}</View>
      </Animated.View>
    );
  }

  private openAnimation = (): void => {
    const { x, y } = this.props;

    Animated.spring(this.state.pan, {
			toValue: { x, y },
			useNativeDriver: true
    }).start();
  };

  private scaleAnimation = (toValue: number): void => {
    Animated.spring(this.state.scale, {
      speed: 20,
			toValue,
			useNativeDriver: true
    }).start();
  };
}
