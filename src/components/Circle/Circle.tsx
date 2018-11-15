import * as React from "react";
import { View } from "react-native";
import { styles } from "../../styles";

export interface ICircleProps {
  style: object;
}

// tslint:disable-next-line:typedef
export const Circle: React.SFC<ICircleProps> = ({ style }: ICircleProps) => (
  <View style={[styles.circle, style]} />
);
