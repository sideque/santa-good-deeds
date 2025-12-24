import React from "react";
import "../style.css";

const Profile = ({ score, deeds }) => {
  const totalDeeds = deeds.length;

  const deedCounts = deeds.reduce((acc, deed) => {
    acc[deed.type] = (acc[deed.type] || 0) + 1;
    return acc;
  }, {});

  const getLevel = (score) => {
    if (score < 20) return "Snowflake ❄️";
    if (score < 50) return "Elf 🧝";
    if (score < 100) return "Reindeer 🦌";
    if (score < 200) return "Santa’s Helper 🎁";
    return "Santa Legend 🎅";
  };

  return (
    <section className="profile-container">
      <h1 className="profile-title">👤 Profile</h1>

      {/* ===== SUMMARY ===== */}
      <div className="profile-summary">
        <div className="summary-card">
          <h3>Total Score</h3>
          <p className="big">{score}</p>
        </div>

        <div className="summary-card">
          <h3>Total Deeds</h3>
          <p className="big">{totalDeeds}</p>
        </div>

        <div className="summary-card">
          <h3>Santa Level</h3>
          <p className="level">{getLevel(score)}</p>
        </div>
      </div>

      {/* ===== DEED BREAKDOWN ===== */}
      <div className="profile-breakdown">
        <h2>Good Deeds Breakdown</h2>

        {Object.keys(deedCounts).length === 0 ? (
          <p className="empty">No deeds logged yet.</p>
        ) : (
          <ul>
            {Object.entries(deedCounts).map(([type, count]) => (
              <li key={type}>
                <span className="deed-type">{type}</span>
                <span className="deed-count">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Profile;
