import React from "react";
import "../style.css";

/**
 * SantaMeter
 * Visual progress indicator based on score.
 *
 * Props:
 * - score: number
 * - maxScore: number (default 200)
 */
const SantaMeter = ({ score = 0, maxScore = 200 }) => {
  const percent = Math.min(Math.round((score / maxScore) * 100), 100);

  const getStatus = () => {
    if (percent < 25) return { label: "Naughty Zone", color: "low" };
    if (percent < 50) return { label: "Getting Better", color: "mid" };
    if (percent < 75) return { label: "Nice List", color: "good" };
    return { label: "Santa Legend", color: "great" };
  };

  const status = getStatus();

  return (
    <div className="santa-meter">
      <div className="meter-header">
        <h3>🎅 Santa Meter</h3>
        <span className={`status ${status.color}`}>{status.label}</span>
      </div>

      <div className="meter-track">
        <div
          className={`meter-fill ${status.color}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="meter-footer">
        <span>{score} pts</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default SantaMeter;
