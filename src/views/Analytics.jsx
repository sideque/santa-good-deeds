import React from "react";
import "../style.css";

const Analytics = ({ analytics }) => {
  if (!analytics) {
    return <p className="analytics-empty">No analytics data available</p>;
  }

  const {
    weeklyScore,
    bestDay,
    worstDay,
    trend,
    dailyBreakdown,
  } = analytics;

  return (
    <section className="analytics-container">
      <h1 className="analytics-title">📊 Santa Analytics</h1>
      <Charts data={analytics.dailyBreakdown} />
      {/* ===== SUMMARY CARDS ===== */}
      <div className="analytics-cards">
        <div className="card">
          <h3>Weekly Score</h3>
          <p className="score">{weeklyScore}</p>
        </div>

        <div className="card">
          <h3>Best Day</h3>
          <p>{bestDay}</p>
        </div>

        <div className="card">
          <h3>Worst Day</h3>
          <p>{worstDay}</p>
        </div>

        <div className={`card trend ${trend}`}>
          <h3>Trend</h3>
          <p>
            {trend === "up" && "📈 Improving"}
            {trend === "down" && "📉 Declining"}
            {trend === "stable" && "➖ Stable"}
          </p>
        </div>
      </div>

      {/* ===== DAILY BREAKDOWN ===== */}
      <div className="breakdown">
        <h2>Daily Breakdown</h2>

        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dailyBreakdown.map((day, index) => (
              <tr key={index}>
                <td>{day.name}</td>
                <td>{day.score}</td>
                <td>
                  {day.score >= 6
                    ? "🎉 Excellent"
                    : day.score >= 3
                    ? "🙂 Good"
                    : "😐 Needs Improvement"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Analytics;
