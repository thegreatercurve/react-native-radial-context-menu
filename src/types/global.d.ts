declare interface IButton {
  value: any;
  component(): React.ReactNode;
}

declare interface ICoordinate {
  x: number;
  y: number;
}

declare type Direction =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
