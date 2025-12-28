import React from "react";
import "../style.css";

const Analytics = ({ analytics, activePage, setActivePage }) => {
  if (!analytics) {
    return (
      <div className="app">
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

        <div className="container">
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

          <main className="main-content" role="main">
            <p className="analytics-empty">No analytics data available</p>
          </main>
        </div>
      </div>
    );
  }

  const {
    weeklyScore,
    bestDay,
    worstDay,
    trend,
    dailyBreakdown,
  } = analytics;

  // Find max score for chart scaling
  const maxScore = Math.max(...dailyBreakdown.map(day => day.score), 10);

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
          <section className="analytics-container">
            <h1 className="analytics-title">
              <span className="title-sparkle">✨</span>
              <span className="title-text">Santa Analytics</span>
              <span className="title-sparkle">✨</span>
            </h1>

            {/* Chart */}
            <div className="chart-container" style={{ animationDelay: '0.2s' }}>
              <h3 className="chart-title">Weekly Performance</h3>
              {dailyBreakdown && dailyBreakdown.length > 0 ? (
                <div className="chart-bars">
                  {dailyBreakdown.map((day, index) => (
                    <div key={index} className="chart-bar-wrapper" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                      <div className="chart-bar-bg">
                        <div
                          className="chart-bar-fill"
                          style={{ height: `${(day.score / maxScore) * 100}%` }}
                        />
                      </div>
                      <div className="chart-label">
                        <div className="chart-score">{day.score}</div>
                        <div>{day.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="chart-empty">No daily data available</p>
              )}
            </div>

            {/* Summary Cards */}
            <div className="analytics-cards">
              <article className="analytics-stat-card" style={{ animationDelay: '0.4s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="stat-card-title">
                    <span className="card-icon">📈</span>
                    Weekly Score
                  </h3>
                  <p className="stat-value">{weeklyScore}</p>
                  <p className="stat-description">Total points this week</p>
                </div>
              </article>

              <article className="analytics-stat-card" style={{ animationDelay: '0.5s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="stat-card-title">
                    <span className="card-icon">🏆</span>
                    Best Day
                  </h3>
                  <p className="stat-value-day">{bestDay}</p>
                  <p className="stat-description">Your peak performance</p>
                </div>
              </article>

              <article className="analytics-stat-card" style={{ animationDelay: '0.6s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="stat-card-title">
                    <span className="card-icon">📅</span>
                    Worst Day
                  </h3>
                  <p className="stat-value-day">{worstDay}</p>
                  <p className="stat-description">Room for improvement</p>
                </div>
              </article>

              <article className={`analytics-stat-card trend-card trend-${trend}`} style={{ animationDelay: '0.7s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="stat-card-title">
                    <span className="card-icon">
                      {trend === "up" && "📈"}
                      {trend === "down" && "📉"}
                      {trend === "stable" && "➖"}
                    </span>
                    Trend
                  </h3>
                  <p className="stat-value-trend">
                    {trend === "up" && "Improving"}
                    {trend === "down" && "Declining"}
                    {trend === "stable" && "Stable"}
                  </p>
                  <p className="stat-description">Your progress trajectory</p>
                </div>
              </article>
            </div>

            {/* Daily Breakdown Table */}
            <div className="breakdown" style={{ animationDelay: '0.8s' }}>
              <h2 className="breakdown-title">Daily Breakdown</h2>

              <div className="table-container">
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
                        <td className="table-day">{day.name}</td>
                        <td className="table-score">{day.score}</td>
                        <td className="table-status">
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Analytics;