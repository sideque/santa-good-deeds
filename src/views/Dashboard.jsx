import React from "react";
import SantaMeter from "../components/SantaMeter";
import StreakCard from "../components/StreakCard";
import { getSantaLevel } from "../controllers/ProgressController";
import "../style.css";

const Dashboard = ({ score, currentStreak, bestStreak, activePage, setActivePage }) => {
  // Derived values
  const santaLevel = getSantaLevel(score);
  const santaMeterProgress = Math.min((score / 200) * 100, 100);

  // Animated background stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="app">
      {/* Animated starfield background */}
      <div className="starfield">
        {stars.map(star => (
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

      {/* Top Widgets with staggered animation */}
      <div className="top-widgets">
        <div className="widget-wrapper" style={{ animationDelay: '0.1s' }}>
          <SantaMeter score={score} maxScore={200} />
        </div>
        <div className="widget-wrapper" style={{ animationDelay: '0.2s' }}>
          <StreakCard currentStreak={currentStreak} bestStreak={bestStreak} />
        </div>
      </div>

      {/* Main Layout */}
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
          <section className="dashboard-section">
            <h2 className="section-title">
              <span className="title-sparkle">✨</span>
              <span className="title-text">Your Santa Dashboard</span>
              <span className="title-sparkle">✨</span>
            </h2>

            <div className="metrics-grid">
              {/* Santa Level Card */}
             <article className="profile-summary-card level-summary-card" style={{ animationDelay: '0.5s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="summary-card-title">
                    <span className="card-icon">🎅</span>
                    Santa Level
                  </h3>
                  <div className="profile-level-display">
                    <span className="level-number">{santaLevel}</span>
                  </div>
                  <p className="summary-description">Your current rank</p>
                </div>
              </article>

              {/* Total Score Card */}
              <article className="metric-card score-card" style={{ animationDelay: '0.6s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-icon">⭐</span>
                    Total Score
                  </h3>
                  <div className="score-display">
                    <div className="score-value">{score}</div>
                    <div className="score-particles">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}>✨</div>
                      ))}
                    </div>
                  </div>
                  <p className="card-description">
                    Points earned from spreading joy.
                  </p>
                </div>
              </article>

              {/* Current Streak Card */}
              <article className="metric-card streak-card-main" style={{ animationDelay: '0.7s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-icon">🔥</span>
                    Current Streak
                  </h3>
                  <div className="streak-display">
                    <div className="streak-value">
                      <span className="streak-number">{currentStreak}</span>
                      <span className="streak-unit">days</span>
                    </div>
                    <div className="flame-animation">
                      <div className="flame flame-1"></div>
                      <div className="flame flame-2"></div>
                      <div className="flame flame-3"></div>
                    </div>
                  </div>
                  <p className="card-description">
                    Keep the magic going—don't break the chain!
                  </p>
                </div>
              </article>

              {/* Santa Meter Progress Card */}
              <article className="metric-card meter-card-main" style={{ animationDelay: '0.8s' }}>
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-icon">🎁</span>
                    Santa Meter
                  </h3>
                  <div className="progress-display">
                    <div className="circular-progress">
                      <svg viewBox="0 0 120 120" className="progress-svg">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          className="progress-bg"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          className="progress-ring"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 54}`,
                            strokeDashoffset: `${2 * Math.PI * 54 * (1 - santaMeterProgress / 100)}`
                          }}
                        />
                      </svg>
                      <div className="progress-center">
                        <span className="progress-percent">{Math.round(santaMeterProgress)}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="card-description">
                    Fill the sleigh with more good deeds!
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;