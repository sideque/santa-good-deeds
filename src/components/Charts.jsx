import React from "react";
import "../style.css";
const Charts = ({ data = [] }) => {
  if (!data.length) {
    return <p className="chart-empty">No data to visualize yet.</p>;
  }

  const maxScore = Math.max(...data.map((d) => d.score), 1);

  return (
    <div className="chart-container">
      <h2 className="chart-title">📊 Weekly Activity</h2>

      <div className="chart-bars">
        {data.map((day, index) => {
          const heightPercent = (day.score / maxScore) * 100;

          return (
            <div key={index} className="chart-bar-wrapper">
              <div className="chart-bar-bg">
                <div
                  className="chart-bar-fill"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="chart-label">{day.name.slice(0, 3)}</span>
              <span className="chart-score">{day.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Charts;
