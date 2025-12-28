import React from "react";
import "../style.css";

/**
 * StreakCard - Luxury Edition
 * Shows current streak, best streak, and motivational message
 * with enhanced visual design
 *
 * Props:
 * - currentStreak: number
 * - bestStreak: number
 */
const StreakCard = ({ currentStreak = 0, bestStreak = 0 }) => {
  const getMessage = () => {
    if (currentStreak === 0) return "Start today and build your streak 🎯";
    if (currentStreak < 3) return "Good start! Stay consistent 💪";
    if (currentStreak < 7) return "Nice! You're building a habit 🔥";
    if (currentStreak < 14) return "Amazing consistency! Keep going 🚀";
    return "Legendary streak! Santa is proud 🎅";
  };

  return (
    <div className="streak-card">
      <div className="streak-header">
        <h3>🔥 Streak</h3>
      </div>

      <div className="streak-stats">
        <div className="streak-item">
          <span className="label">Current</span>
          <span className="value">{currentStreak} days</span>
        </div>

        <div className="streak-item">
          <span className="label">Best</span>
          <span className="value">{bestStreak} days</span>
        </div>
      </div>

      <p className="streak-message">{getMessage()}</p>
    </div>
  );
};

export default StreakCard;