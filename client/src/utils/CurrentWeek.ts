export const currentWeek = (today: Date) => {
  let firstDayOfWeek;
  let lastDayOfWeek;
  today.getDay() === 0
    ? (firstDayOfWeek = new Date(today.setDate(today.getDate() - 7)))
    : (firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 1)
      ));
  today.getDay() === 0
    ? (lastDayOfWeek = new Date(today.setDate(today.getDate())))
    : (lastDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 7)
      ));
  // firstDayOfWeek = new Date(
  //   today.setDate(today.getDate() - today.getDay() + 1)
  // );
  // const lastDayOfWeek = new Date(
  //   today.setDate(today.getDate() - today.getDay() + 7)
  // );

  const daysOfWeek = [];
  for (let i = firstDayOfWeek; i <= lastDayOfWeek; i.setDate(i.getDate() + 1)) {
    daysOfWeek.push(new Date(i));
  }

  return daysOfWeek;
};
