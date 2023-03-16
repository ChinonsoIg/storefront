export const addComma = (arg: number) => {
  if (typeof(arg) !== "number") {
    return;
  }
  return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};