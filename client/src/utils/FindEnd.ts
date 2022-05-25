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

export const endOfSeason = () => {
  let date = new Date();
  if (date.getDay() === 0) return endOfDay();
  switch (date.getMonth()) {
    case 0:
    case 1:
    case 12:
      date.setDate(1);
      date.setMonth(2);
      date.setHours(0, 0, 0);
      break;
    case 2:
    case 3:
    case 4:
      date.setDate(1);
      date.setMonth(5);
      date.setHours(0, 0, 0);
      break;
    case 5:
    case 6:
    case 7:
      date.setDate(1);
      date.setMonth(8);
      date.setHours(0, 0, 0);
      break;
    case 8:
    case 9:
    case 10:
      date.setDate(1);
      date.setMonth(11);
      date.setHours(0, 0, 0);
      break;
  }

  return new Date(date);
};
