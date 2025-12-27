// Dashboard.jsx
// SantaVerse Dashboard (Clean & Correct)

import SantaMeter from "../components/SantaMeter";
import StreakCard from "../components/StreakCard";
import "../style.css";

const Dashboard = ({ score, currentStreak, bestStreak, activePage, setActivePage }) => {
  // Derived values (NO redeclaration of props)
  const santaLevel = Math.floor(score / 20);
  const santaMeterProgress = Math.min((score / 200) * 100, 100);

  return (
    <div className="app">
      {/* Top Widgets */}
      <SantaMeter score={score} maxScore={200} />

      <StreakCard
        currentStreak={currentStreak}
        bestStreak={bestStreak}
      />

      {/* ================= Layout ================= */}
      <div className="container">
        {/* Sidebar */}
        
        <aside className="sidebar">
          <nav className="sidebar-nav" aria-label="Main navigation">
            <ul className="sidebar-menu">
              <li className="menu-item">
                <button
                  className={`menu-link ${activePage === 'dashboard' ? 'active' : ''}`}
                  id="dashboard"
                  onClick={() => setActivePage('dashboard')}
                  aria-current={activePage === 'dashboard' ? 'page' : undefined}
                >
                  🎁 Dashboard
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activePage === 'deeds' ? 'active' : ''}`}
                  id="deeds"
                  onClick={() => setActivePage('deeds')}
                  aria-current={activePage === 'deeds' ? 'page' : undefined}
                >
                  ⭐ Deeds
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activePage === 'analytics' ? 'active' : ''}`}
                  id="analytics"
                  onClick={() => setActivePage('analytics')}
                  aria-current={activePage === 'analytics' ? 'page' : undefined}
                >
                  📊 Analytics
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activePage === 'profile' ? 'active' : ''}`}
                  id="profile"
                  onClick={() => setActivePage('profile')}
                  aria-current={activePage === 'profile' ? 'page' : undefined}
                >
                  👤 Profile
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ================= Main Content ================= */}
        <main className="main-content" role="main">
          <section className="dashboard-section">
            <h2 className="section-title">
              ✨ Your Santa Dashboard ✨
            </h2>

            <div className="metrics-grid">
              {/* Santa Level */}
              <article className="metric-card santa-level-card">
                <h3 className="card-title">🎅 Santa Level</h3>
                <div className="level-badge">Level {santaLevel}</div>
                <p className="card-description">
                  Ho ho ho! You're climbing the nice list ranks.
                </p>
              </article>

              {/* Total Score */}
              <article className="metric-card score-card">
                <h3 className="card-title">⭐ Total Score</h3>
                <div className="score-value">{score}</div>
                <p className="card-description">
                  Points earned from spreading joy.
                </p>
              </article>

              {/* Current Streak */}
              <article className="metric-card streak-card">
                <h3 className="card-title">🔥 Current Streak</h3>
                <div className="streak-value">{currentStreak} days</div>
                <p className="card-description">
                  Keep the magic going—don’t break the chain!
                </p>
              </article>

              {/* Santa Meter Progress */}
              <article className="metric-card meter-card">
                <h3 className="card-title">🎁 Santa Meter</h3>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={santaMeterProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${santaMeterProgress}%` }}
                    />
                  </div>

                  <span className="progress-text">
                    {Math.round(santaMeterProgress)}% to next level
                  </span>
                </div>

                <p className="card-description">
                  Fill the sleigh with more good deeds!
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
