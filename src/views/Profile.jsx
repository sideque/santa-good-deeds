import React from "react";
import "../style.css";

const Profile = ({ score, deeds, completedDeeds, activePage, setActivePage }) => {
  // Ensure we always operate on an array of deed objects
  const safeCompleted = completedDeeds || [];
  const totalDeeds = safeCompleted.length;

  const deedCounts = safeCompleted.reduce((acc, deed) => {
    const name = deed?.type || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});


  const getLevel = (score) => {
    if (score < 20) return "Snowflake ❄️";
    if (score < 50) return "Elf 🧝";
    if (score < 100) return "Reindeer 🦌";
    if (score < 200) return "Santa's Helper 🎁";
    return "Santa Legend 🎅";
  };

  return (
    <div className="app">
      {/* Animated starfield background */}
      <div className="starfield">
        {Array.from({ length: 50 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 2
        })).map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Floating ornaments */}
      <div className="ornament ornament-1">🎄</div>
      <div className="ornament ornament-2">⭐</div>
      <div className="ornament ornament-3">🎁</div>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-glow"></div>
          <nav className="sidebar-nav" aria-label="Main navigation">
            <ul className="sidebar-menu">
              {[
                { id: 'dashboard', icon: '🎁', label: 'Dashboard' },
                { id: 'deeds', icon: '⭐', label: 'Deeds' },
                { id: 'analytics', icon: '📊', label: 'Analytics' },
                { id: 'profile', icon: '👤', label: 'Profile' }
              ].map((item, index) => (
                <li key={item.id} className="menu-item" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <button
                    className={`menu-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => setActivePage(item.id)}
                    aria-current={activePage === item.id ? 'page' : undefined}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-shine"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content" role="main">
          <section className="profile-container">
            <h1 className="profile-title">
              <span className="title-sparkle">✨</span>
              <span className="title-text">Your Profile</span>
              <span className="title-sparkle">✨</span>
            </h1>

            {/* Summary Cards */}
            <div className="profile-summary">
              <article className="profile-summary-card" style={{ animationDelay: '0.3s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="summary-card-title">
                    <span className="card-icon">⭐</span>
                    Total Score
                  </h3>
                  <div className="profile-big-value">
                    <span className="big">{score}</span>
                  </div>
                  <p className="summary-description">Your cumulative points</p>
                </div>
              </article>

              <article className="profile-summary-card" style={{ animationDelay: '0.4s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="summary-card-title">
                    <span className="card-icon">🎯</span>
                    Total Deeds
                  </h3>
                  <div className="profile-big-value">
                    <span className="big">{totalDeeds}</span>
                  </div>
                  <p className="summary-description">Acts of kindness logged</p>
                </div>
              </article>

              <article className="profile-summary-card level-summary-card" style={{ animationDelay: '0.5s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="summary-card-title">
                    <span className="card-icon">🎅</span>
                    Santa Level
                  </h3>
                  <div className="profile-level-display">
                    <p className="level">{getLevel(score)}</p>
                  </div>
                  <p className="summary-description">Your current rank</p>
                </div>
              </article>
            </div>

            {/* Deed Breakdown */}
            <div className="profile-breakdown" style={{ animationDelay: '0.6s' }}>
              <h2 className="breakdown-title">
                <span className="breakdown-icon">📊</span>
                Good Deeds Breakdown
              </h2>

              {Object.keys(deedCounts).length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎁</div>
                  <p className="empty">No deeds logged yet.</p>
                  <p className="empty-subtitle">Start spreading joy to see your stats here!</p>
                </div>
              ) : (
                <ul className="deed-breakdown-list">
                  {Object.entries(deedCounts)
                    .sort((a, b) => b[1] - a[1]) // Sort by count descending
                    .map(([type, count], index) => (
                      <li key={type} className="deed-breakdown-item" style={{ animationDelay: `${0.7 + index * 0.05}s` }}>
                        <div className="deed-info">
                          <span className="deed-type">{type}</span>
                          <div className="deed-bar">
                            <div 
                              className="deed-bar-fill"
                              style={{ 
                                width: `${(count / Math.max(...Object.values(deedCounts))) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                        <span className="deed-count">{count}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;