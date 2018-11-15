// tslint:disable:typedef

interface IOpenDirections {
  [key: string]: Direction;
}

export const OPEN_DIRECTIONS: IOpenDirections = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
};

export const DEFAULT_OPTIONS = {
  BACKGROUND_COLOR: "#fa8072",
  BUTTON_DIAMETER: 60,
  MENU_DIAMETER: 90,
  OPEN_DELAY: 0,
  SPREAD_ANGLE: 170,
  SPREAD_RADIUS: 100,
  VIBRATE: true,
  VIBRATE_DURATION: 50,
};
