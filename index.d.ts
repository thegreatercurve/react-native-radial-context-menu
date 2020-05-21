declare module 'react-native-radial-context-menu' {
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

	export type withRadialActionMenu = <P extends withRadialActionMenuProps>(
		// tslint:disable-next-line:variable-name
		Component: React.ComponentType<P>
	) => React.ComponentClass

}
