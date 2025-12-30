
export const getCurrentStreak = (completedDeeds = []) => {
  if (!completedDeeds.length) return 0;

  // sort dates ascending
  const dates = completedDeeds
    .map(d => new Date(d.date))
    .sort((a, b) => a - b);

  let streak = 1;

  for (let i = dates.length - 1; i > 0; i--) {
    const diff =
      (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  // check if streak includes today or yesterday
  const today = new Date();
  const lastDate = dates[dates.length - 1];
  const lastDiff =
    (today - lastDate) / (1000 * 60 * 60 * 24);

  if (lastDiff > 1) return 0;

  return streak;
};

export const getBestStreak = (completedDeeds = []) => {
  if (!completedDeeds.length) return 0;

  const dates = completedDeeds
    .map(d => new Date(d.date))
    .sort((a, b) => a - b);

  let best = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff =
      (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
};
