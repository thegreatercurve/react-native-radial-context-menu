import { StyleSheet } from "react-native";

interface IStyle {
  button: object;
  circle: object;
  list: object;
  menu: object;
}

export const styles: IStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    position: "absolute",
    zIndex: 999,
  },
  circle: {
    borderColor: "green",
    borderRadius: 999,
    position: "absolute",
    zIndex: 999,
  },
  list: {
    position: "relative",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
