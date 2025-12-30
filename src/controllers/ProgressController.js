export const getSantaMessage = (score = 0) => {
  if (score === 0) {
    return "🎅 Start logging your good deeds today!";
  }

  if (score > 0 && score < 20) {
    return "🙂 Good start! Consistency is the key.";
  }

  if (score >= 20 && score < 50) {
    return "💪 You're improving! Keep the momentum going.";
  }

  if (score >= 50 && score < 100) {
    return "🎁 Great work! You're officially on Santa’s Nice List.";
  }

  return "🎉 Ho Ho Ho! You're a Santa Legend!";
};

export const getSantaLevel = (score = 0) => {
  if (score < 20) return "Snowflake ❄️";
  if (score < 50) return "Elf 🧝";
  if (score < 100) return "Reindeer 🦌";
  if (score < 200) return "Santa’s Helper 🎁";
  return "Santa Legend 🎅";
};
