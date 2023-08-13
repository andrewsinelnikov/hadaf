export const currentWeek = (todayDate: Date) => {
  const firstDayOfWeek = new Date(
    todayDate.setDate(todayDate.getDate() - todayDate.getDay() + 1)
  );
  const lastDayOfWeek = new Date(
    todayDate.setDate(todayDate.getDate() - todayDate.getDay() + 7)
  );

  const daysOfWeek = [];
  for (let i = firstDayOfWeek; i <= lastDayOfWeek; i.setDate(i.getDate() + 1)) {
    daysOfWeek.push(new Date(i));
  }

  return daysOfWeek;
};
