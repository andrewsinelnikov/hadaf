export const currentWeek = (today: Date) => {
  // let firstDayOfWeek;
  // let lastDayOfWeek;
  // today.getDay() === 0
  //   ? (firstDayOfWeek = new Date(today.setDate(today.getDate() - 7)))
  //   : (firstDayOfWeek = new Date(
  //       today.setDate(today.getDate() - today.getDay() + 1)
  //     ));
  // today.getDay() === 0
  //   ? (lastDayOfWeek = today
  //   : (lastDayOfWeek = new Date(
  //       today.setDate(today.getDate() - today.getDay() + 7)
  //     ));
  const firstDayOfWeek = new Date(
    today.setDate(
      today.getDate() - today.getDay() + 1 - (today.getDay() === 0 ? 7 : 0)
    )
  );
  // const firstDayOfWeek = new Date(
  //   today.setDate(today.getDate() - today.getDay() + 1)
  // );
  // const lastDayOfWeek = new Date(
  //   today.setDate(today.getDate() - today.getDay() + 7)
  // );
  const lastDayOfWeek = new Date(
    today.setDate(
      today.getDate() - today.getDay() + 7 + (today.getDay() === 0 ? -7 : 0)
    )
  );

  const daysOfWeek = [];
  for (let i = firstDayOfWeek; i <= lastDayOfWeek; i.setDate(i.getDate() + 1)) {
    daysOfWeek.push(new Date(i));
  }

  return daysOfWeek;
};
