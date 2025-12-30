// weight per deed type
const DEED_WEIGHTS = {
  help: 3,
  study: 2,
  exercise: 1,
  kindness: 2,
  share: 2,
};

// optional daily consistency bonus
const CONSISTENCY_BONUS = 5;

export const calculateScore = (deeds = []) => {
  if (!Array.isArray(deeds) || deeds.length === 0) return 0;

  let score = 0;

  deeds.forEach((deed) => {
    score += DEED_WEIGHTS[deed.type] || 0;
  });

  // consistency bonus (same-day multiple deeds)
  const groupedByDate = deeds.reduce((acc, deed) => {
    const day = new Date(deed.timestamp).toDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  Object.values(groupedByDate).forEach((count) => {
    if (count >= 3) {
      score += CONSISTENCY_BONUS;
    }
  });

  return score;
};
