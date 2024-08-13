export const remapRange = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => {
  return toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
};
