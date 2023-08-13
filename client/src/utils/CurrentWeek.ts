export const currentWeek = (today: Date) => {
  let firstDayOfWeek;
  today.getDay() === 0
    ? (firstDayOfWeek = new Date(today.setDate(today.getDate())))
    : (firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 1)
      ));
  firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  );
  const lastDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 7)
  );

  const daysOfWeek = [];
  for (let i = firstDayOfWeek; i <= lastDayOfWeek; i.setDate(i.getDate() + 1)) {
    daysOfWeek.push(new Date(i));
  }

  return daysOfWeek;
};
