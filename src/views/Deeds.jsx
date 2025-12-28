import React from "react";
import "../style.css";

const Deeds = ({ deeds, selectedDeeds, setSelectedDeeds, onSubmit, activePage, setActivePage }) => {
  const handleToggle = (deedId) => {
    setSelectedDeeds((prev) =>
      prev.includes(deedId)
        ? prev.filter((id) => id !== deedId)
        : [...prev, deedId]
    );
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
          <section className="deeds-container">
            <h1 className="deeds-title">
              <span className="title-sparkle">✨</span>
              <span className="title-text">Select Your Good Deeds</span>
              <span className="title-sparkle">✨</span>
            </h1>

            <p className="deeds-subtitle">
              Choose the acts of kindness you've done today and spread some Christmas magic! ✨
            </p>

            {/* Deeds Grid */}
            <div className="deeds-list">
              {deeds.map((deed, index) => (
                <article
                  key={deed.id}
                  className={`deed-card ${selectedDeeds.includes(deed.id) ? "active" : ""}`}
                  onClick={() => handleToggle(deed.id)}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="deed-card-glow"></div>
                  <div className="deed-card-content">
                    <div className="deed-icon-container">
                      <span className="deed-emoji">{deed.emoji}</span>
                      {selectedDeeds.includes(deed.id) && (
                        <div className="deed-checkmark">✓</div>
                      )}
                    </div>
                    <h3 className="deed-name">{deed.type}</h3>
                    <p className="deed-points">+{deed.points} pts</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={selectedDeeds.length === 0}
              >
                <span className="submit-icon">🎁</span>
                <span className="submit-text">
                  Submit {selectedDeeds.length > 0 ? `(${selectedDeeds.length})` : ''} Good Deeds
                </span>
                <span className="submit-shine"></span>
              </button>

              <button onClick={addDeed} className="btn-add">
  ➕ Add Deed
</button>
              
              {selectedDeeds.length > 0 && (
                <p className="submit-hint">
                  You'll earn {deeds
                    .filter(d => selectedDeeds.includes(d.id))
                    .reduce((sum, d) => sum + d.points, 0)} points! 🌟
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Deeds;