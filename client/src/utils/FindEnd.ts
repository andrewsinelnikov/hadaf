export const endOfDay = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0);
  return new Date(date);
};

export const endOfWeek = () => {
  let date = new Date();
  if (date.getDay() === 0) return endOfDay();
  let first = date.getDate() - date.getDay() + 1;
  let last = first + 6;
  date.setDate(last + 1);
  return new Date(date.setHours(0, 0, 0));
};
