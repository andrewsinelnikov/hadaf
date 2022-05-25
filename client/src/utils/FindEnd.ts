export const endOfDay = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0);
  return new Date(date);
};
