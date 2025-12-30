
import { calculateDailyScore, applyConsistencyBonus } from "../services/scoringService";

export function computeWeeklyAnalytics(weeklyData) {
  if (!Array.isArray(weeklyData) || weeklyData.length === 0) {
    return {
      totalScore: 0,
      bestDay: null,
      worstDay: null,
      trend: "stable",
      dailyScores: []
    }
  }

  // Step 1: Calculate daily scores using scoring service
  const dailyScores = weeklyData.map((day, index) => {
    const score = calculateDailyScore(day.deeds);
    return {
      ...day,
      score,
      dayIndex: index // For trend calculation
    };
  });

  // Step 2: Compute total score (sum of daily scores)
  let totalScore = dailyScores.reduce((sum, day) => sum + day.score, 0);

  // Step 3: Apply weekly consistency bonus if eligible
  totalScore = applyConsistencyBonus(totalScore, weeklyData);

  // Step 4: Find best and worst days (highest/lowest scores; pick first in case of ties)
  const bestDay = dailyScores.reduce((best, current) =>
    current.score > best.score ? current : best
  );
  const worstDay = dailyScores.reduce((worst, current) =>
    current.score < worst.score ? current : worst
  );

  // Step 5: Determine improvement trend
  // Compare consecutive days: count ups (score > prev), downs (score < prev), stables (equal)
  let ups = 0, downs = 0, stables = 0;
  for (let i = 1; i < dailyScores.length; i++) {
    const prevScore = dailyScores[i - 1].score;
    const currScore = dailyScores[i].score;
    if (currScore > prevScore) ups++;
    else if (currScore < prevScore) downs++;
    else stables++;
  }

  let trend;
  if (ups > downs) {
    trend = 'up';
  } else if (downs > ups) {
    trend = 'down';
  } else {
    trend = 'stable';
  }

  // Return structured analytics object
  return {
    totalScore,
    bestDay: {
      date: bestDay.date,
      score: bestDay.score
    },
    worstDay: {
      date: worstDay.date,
      score: worstDay.score
    },
    trend,
    dailyScores 
  };
}

export default { computeWeeklyAnalytics };