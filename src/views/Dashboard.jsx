// Dashboard.jsx
// This is the main Dashboard component for the SantaVerse app.
// It uses a modern, responsive layout with a top navbar, left sidebar, and main content area.
// The layout is built with semantic HTML elements for accessibility and SEO.
// Flexbox is used for the overall structure to ensure clean alignment.
// Dummy data is hardcoded for demonstration purposes (no API calls).
// Christmas theme: Red (#dc3545) and green (#198754) accents, white backgrounds, subtle shadows for a festive yet modern feel.

import React from 'react';
import "../style.css";

const Dashboard = () => {
  // Dummy static data for the dashboard metrics
  const santaLevel = 5;
  const totalGoodDeedsScore = 1250;
  const currentStreak = 7;
  const santaMeterProgress = 75; // Percentage for the progress bar

  return (
    // Root app container: Full height, flex column to stack navbar and main container
    <div className="app">
      {/* Top Navbar: Fixed height, spans full width, centered app name */}
      <header className="navbar">
        <h1 className="navbar-title">SantaVerse</h1>
      </header>

      {/* Main layout container: Flex row for sidebar and content side-by-side */}
      <div className="container">
        {/* Left Sidebar: Fixed width, vertical menu for navigation */}
        <aside className="sidebar">
          <nav className="sidebar-nav" aria-label="Main navigation">
            <ul className="sidebar-menu">
              <li className="menu-item">
                <a href="#dashboard" className="menu-link active">Dashboard</a>
              </li>
              <li className="menu-item">
                <a href="#deeds" className="menu-link">Deeds</a>
              </li>
              <li className="menu-item">
                <a href="#analytics" className="menu-link">Analytics</a>
              </li>
              <li className="menu-item">
                <a href="#profile" className="menu-link">Profile</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area: Takes remaining width, focuses on dashboard sections */}
        <main className="main-content" role="main">
          {/* Dashboard Section: Grid layout for cards, responsive on smaller screens */}
          <section className="dashboard-section" aria-labelledby="dashboard-heading">
            <h2 id="dashboard-heading" className="section-title">Your Santa Dashboard</h2>

            {/* Grid of metric cards: 2x2 layout on desktop, stacks on mobile */}
            <div className="metrics-grid">
              {/* Santa Level Card: Prominent card with level badge */}
              <article className="metric-card santa-level-card">
                <h3 className="card-title">Santa Level</h3>
                <div className="level-badge">Level {santaLevel}</div>
                <p className="card-description">Ho ho ho! You're climbing the nice list ranks.</p>
              </article>

              {/* Total Good Deeds Score Card: Large number display */}
              <article className="metric-card score-card">
                <h3 className="card-title">Total Good Deeds Score</h3>
                <div className="score-value">{totalGoodDeedsScore.toLocaleString()}</div>
                <p className="card-description">Points earned from spreading joy this season.</p>
              </article>

              {/* Current Streak Card: Streak counter with flame icon placeholder */}
              <article className="metric-card streak-card">
                <h3 className="card-title">Current Streak</h3>
                <div className="streak-value">{currentStreak} days</div>
                <p className="card-description">Keep the magic going—don't break the chain!</p>
              </article>

              {/* Santa Meter Progress Bar Card: Visual progress indicator */}
              <article className="metric-card meter-card">
                <h3 className="card-title">Santa Meter</h3>
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
                    ></div>
                  </div>
                  <span className="progress-text">{santaMeterProgress}% to next level</span>
                </div>
                <p className="card-description">Fill the sleigh with more good deeds!</p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;