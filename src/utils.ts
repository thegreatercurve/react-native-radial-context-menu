interface ISizeStyles {
  height: number;
  width: number;
}

// tslint:disable-next-line:typedef
export const getSizeStyles = (size: number): ISizeStyles => ({
  height: size,
  width: size,
});
