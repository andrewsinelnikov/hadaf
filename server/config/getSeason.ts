export const getSeason = (date: Date) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 11) {
    return "autumn";
  } else {
    return "winter";
  }
};

export const getSeasonStartEndDates = (date: Date) => {
  const season = getSeason(date);

  const startDates = {
    spring: new Date(`${date.getFullYear()}-03-01`),
    summer: new Date(`${date.getFullYear()}-06-01`),
    autumn: new Date(`${date.getFullYear()}-09-01`),
    winter: new Date(`${date.getFullYear()}-12-01`),
  };

  const seasonStart = startDates[season];

  let nextSeasonStart;
  if (season === "winter") {
    nextSeasonStart = new Date(`1 Mar ${date.getFullYear() + 1}`);
  } else {
    nextSeasonStart = Object.values(startDates).find(
      (date) => date > seasonStart
    );
  }

  return {
    seasonStart,
    nextSeasonStart,
  };
};
