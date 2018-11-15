import * as React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  View,
} from "react-native";
import { Menu } from "../../components";
import { DEFAULT_OPTIONS, OPEN_DIRECTIONS } from "../../constants";

const {
  BACKGROUND_COLOR,
  BUTTON_DIAMETER,
  MENU_DIAMETER,
  OPEN_DELAY,
  SPREAD_RADIUS,
  SPREAD_ANGLE,
  VIBRATE,
  VIBRATE_DURATION,
} = DEFAULT_OPTIONS;

interface IInjectedProps {
  backgroundColor: string;
  buttonDiameter: number;
  buttons: IButton[];
  menuDiameter: number;
  openDelay: number;
  spreadAngle: number;
  spreadRadius: number;
  vibrate: boolean;
  vibrateDuration: number;
  onClose?(value: IButton["value"]): void;
  onOpen?(): void;
}

interface IRadialMenuState {
  closed: boolean;
  coords: ICoordinate[];
  height: number;
  pageX: number;
  pageY: number;
  selected: number | null;
  width: number;
  x: number;
  y: number;
}

// tslint:disable-next-line:typedef
export const withRadialActionMenu = <P extends IInjectedProps>(
  // tslint:disable-next-line:variable-name
  Component: React.ComponentType<P>
) =>
  class RadialMenu extends React.Component<
    P & IInjectedProps,
    IRadialMenuState
  > {
    public static defaultProps: Partial<IInjectedProps> = {
      backgroundColor: BACKGROUND_COLOR,
      buttonDiameter: BUTTON_DIAMETER,
      menuDiameter: MENU_DIAMETER,
      openDelay: OPEN_DELAY,
      spreadAngle: SPREAD_ANGLE,
      spreadRadius: SPREAD_RADIUS,
      vibrate: VIBRATE,
      vibrateDuration: VIBRATE_DURATION,
    };

    private longPressTimeout: number | undefined;
    private panResponder: PanResponderInstance = { panHandlers: {} };

    private constructor(props: P & IInjectedProps) {
      super(props);

      this.state = {
        closed: true,
        coords: [],
        height: 0,
        pageX: 0,
        pageY: 0,
        selected: null,
        width: 0,
        x: 0,
        y: 0,
      };

      this.generatePanHandlers();
    }

    public render(): React.ReactNode {
      const {
        backgroundColor,
        buttons,
        buttonDiameter,
        menuDiameter,
        vibrate,
        vibrateDuration,
      } = this.props;
      const { coords, selected, x, y } = this.state;

      return (
        <View {...this.panResponder.panHandlers}>
          <View onLayout={this.handleLayout}>
            <Component {...this.props} />
          </View>
          {!this.state.closed && (
            <Menu
              coords={coords}
              backgroundColor={backgroundColor}
              buttons={buttons}
              buttonDiameter={buttonDiameter}
              menuDiameter={menuDiameter}
              selected={selected}
              vibrate={vibrate}
              vibrateDuration={vibrateDuration}
              x={x}
              y={y}
            />
          )}
        </View>
      );
    }

    private calculateButtonAngle = (
      direction: Direction,
      index: number
    ): number => {
      const { buttons, spreadAngle } = this.props;

      const angle: number = (spreadAngle / buttons.length) * index;

      switch (direction) {
        case OPEN_DIRECTIONS.BOTTOM_RIGHT:
          return 90 - spreadAngle + angle + (spreadAngle / buttons.length) * 1;
        case OPEN_DIRECTIONS.BOTTOM_LEFT:
          return angle + 90;
        case OPEN_DIRECTIONS.TOP_LEFT:
          return 270 - spreadAngle + angle + (spreadAngle / buttons.length) * 1;
        default:
          return angle + 270;
      }
    };

    private calculateDestinationCoords = (
      radius: number,
      angle: number
    ): ICoordinate => ({
      x: radius * Math.cos(this.convertDegreesToRadians(angle)),
      y: radius * Math.sin(this.convertDegreesToRadians(angle)),
    });

    private calculateMenuBoundaries = (
      coord: number,
      size: number,
      offset: number
    ): number => {
      const { menuDiameter } = this.props;

      return Math.max(
        -offset,
        Math.min(coord - menuDiameter / 2, size - menuDiameter + offset)
      );
    };

    private calculateOpenDirection = ({
      nativeEvent,
    }: GestureResponderEvent): Direction => {
      const { height, width } = Dimensions.get("window");

      const { pageX, pageY } = nativeEvent;

      const xThreshold: number = width / 2;
      const yThreshold: number = height / 3;

      if (pageX < xThreshold && pageY < yThreshold) {
        return OPEN_DIRECTIONS.BOTTOM_RIGHT;
      } else if (pageX > xThreshold && pageY < yThreshold) {
        return OPEN_DIRECTIONS.BOTTOM_LEFT;
      } else if (pageX > xThreshold && pageY > yThreshold) {
        return OPEN_DIRECTIONS.TOP_LEFT;
      }

      return OPEN_DIRECTIONS.TOP_RIGHT;
    };

    private convertDegreesToRadians = (angle: number): number =>
      (angle * Math.PI) / 180;

    private findActiveButton = (dx: number, dy: number): number => {
      const { buttonDiameter } = this.props;
      const { coords } = this.state;

      const buttonRadius: number = buttonDiameter / 2;

      return coords.findIndex(
        ({ x, y }: ICoordinate) =>
          dx > x - buttonRadius &&
          dy > y - buttonRadius &&
          dx < x + buttonRadius &&
          dy < y + buttonRadius
      );
    };

    private generatePanHandlers = (): void => {
      this.panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (): boolean => true,
        onPanResponderGrant: this.handleResponderGrant,
        onPanResponderMove: this.handleResponderMove,
        onPanResponderRelease: this.handleResponderRelease,
        onPanResponderTerminate: this.handleResponderRelease,
        onShouldBlockNativeResponder: (): boolean => false,
        onStartShouldSetPanResponder: (): boolean => true,
      });
    };

    private getDestinationCoords = (
      event: GestureResponderEvent
    ): ICoordinate[] => {
      const { buttons, spreadRadius } = this.props;

      const direction: Direction = this.calculateOpenDirection(event);

      return buttons.map((_: IButton, i: number) =>
        this.calculateDestinationCoords(
          spreadRadius,
          this.calculateButtonAngle(direction, i)
        )
      );
    };

    private handleLayout = ({ nativeEvent }: LayoutChangeEvent): void => {
      const { height, width } = nativeEvent.layout;

      this.setState({ height, width });
    };

    private handleResponderGrant = (event: GestureResponderEvent): void => {
      const { openDelay } = this.props;
      const { locationX, locationY, pageX, pageY } = event.nativeEvent;

      const { onOpen } = this.props;
      const { height, width } = this.state;

      const coords: ICoordinate[] = this.getDestinationCoords(event);
      const x: number = this.calculateMenuBoundaries(locationX, width, 0);
      const y: number = this.calculateMenuBoundaries(locationY, height, 15); // Add slight vertical offset

      this.longPressTimeout = window.setTimeout(() => {
        if (onOpen) {
          onOpen();
        }

        this.setState({
          closed: false,
          coords,
          pageX,
          pageY,
          x,
          y,
        });
      }, openDelay);
    };

    private handleResponderMove = (
      _: GestureResponderEvent,
      { dx, dy }: PanResponderGestureState
    ): void => {
      const { selected } = this.state;

      const activeButtonIndex: number = this.findActiveButton(dx, dy);

      if (activeButtonIndex > -1 && activeButtonIndex !== selected) {
        this.setState({ selected: activeButtonIndex });
      } else if (selected !== activeButtonIndex) {
        this.setState({ selected: null });
      }
    };

    private handleResponderRelease = (): void => {
      window.clearTimeout(this.longPressTimeout);

      const { buttons, onClose } = this.props;
      const { selected } = this.state;

      if (onClose) {
        if (typeof selected === "number") {
          onClose(buttons[selected].value);
        } else {
          onClose(null);
        }
      }

      this.setState({ closed: true });
    };
  };
