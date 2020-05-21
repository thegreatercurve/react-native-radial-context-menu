export interface IButton {
  value: any;
  component(): React.ReactNode;
}

interface withRadialActionMenuProps {
  backgroundColor?: string;
  buttonDiameter?: number;
  buttons: IButton[];
  menuDiameter?: number;
  openDelay?: number;
  spreadAngle?: number;
  spreadRadius?: number;
  vibrate?: boolean;
  vibrateDuration?: number;
  onClose?(value: IButton["value"]): void;
  onOpen?(): void;
}

type withRadialActionMenu = <P extends withRadialActionMenuProps>(
  // tslint:disable-next-line:variable-name
  Component: React.ComponentType<P>
) => React.ComponentClass
