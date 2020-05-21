export interface IButton {
	value: any;
	component(): React.ReactNode;
}

export interface withRadialActionMenuProps {
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

export const withRadialActionMenu = <P extends withRadialActionMenuProps>(
	Component: React.ComponentType<P>
) => React.ComponentClass
