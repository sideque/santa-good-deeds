// scoringService.js
// Service layer for calculating individual daily scores and applying bonuses/penalties.
// This is part of the Model in MVC architecture, encapsulating the business logic for scoring.
// Pure JavaScript functions, no dependencies, no UI interactions.
// Input: Daily deed data as an array of strings (e.g., ['helping', 'studying']).
// Output: Integer score for the day, considering deed weights and missed day penalty.

/**
 * Calculates the base score for a single day based on the deeds performed.
 * @param {string[]} deeds - Array of deed types performed that day (e.g., ['helping', 'exercise']).
 * @returns {number} Base score from weighted deeds.
 */
function calculateBaseScore(deeds) {
  let score = 0;
  deeds.forEach(deed => {
    switch (deed.toLowerCase()) {
      case 'helping others':
      case 'helping':
        score += 3;
        break;
      case 'studying':
        score += 2;
        break;
      case 'exercise':
        score += 1;
        break;
      default:
        // Ignore unknown deeds
        break;
    }
  });
  return score;
}

/**
 * Determines if a day is missed (no deeds performed).
 * @param {string[]} deeds - Array of deeds for the day.
 * @returns {boolean} True if no deeds, indicating a missed day.
 */
function isMissedDay(deeds) {
  return deeds.length === 0;
}

/**
 * Calculates the final daily score, including missed day penalty.
 * @param {string[]} deeds - Array of deed types for the day.
 * @returns {number} Final score for the day (base score minus penalty if missed).
 */
function calculateDailyScore(deeds) {
  const baseScore = calculateBaseScore(deeds);
  if (isMissedDay(deeds)) {
    return baseScore - 2; // Apply -2 penalty for missed day
  }
  return baseScore;
}

/**
 * Checks for consistency across a week (all days have at least one deed).
 * @param {Array<{deeds: string[]}>} weeklyData - Array of 7 daily objects.
 * @returns {boolean} True if no missed days in the week.
 */
function hasPerfectConsistency(weeklyData) {
  return weeklyData.every(day => !isMissedDay(day.deeds));
}

/**
 * Applies weekly consistency bonus to the total score.
 * @param {number} totalScore - Current total weekly score without bonus.
 * @param {Array<{deeds: string[]}>} weeklyData - Array of daily data for consistency check.
 * @returns {number} Total score with bonus if applicable.
 */
function applyConsistencyBonus(totalScore, weeklyData) {
  if (hasPerfectConsistency(weeklyData)) {
    return totalScore + 5;
  }
  return totalScore;
}

// Export service functions for use in controller
export { calculateDailyScore, applyConsistencyBonus };