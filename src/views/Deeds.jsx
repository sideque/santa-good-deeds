import React, { useState } from "react";
import "../style.css";
import Dashboard from "./Dashboard";
const DEEDS = [
  { id: 1, label: "Helped someone", type: "help" },
  { id: 2, label: "Studied well", type: "study" },
  { id: 3, label: "Exercised", type: "exercise" },
  { id: 4, label: "Spoke kindly", type: "kindness" },
  { id: 5, label: "Shared knowledge", type: "share" },
];

const Deeds = ({ onAddDeed }) => {
  const [selected, setSelected] = useState([]);

  const toggleDeed = (deed) => {
    setSelected((prev) =>
      prev.includes(deed.id)
        ? prev.filter((id) => id !== deed.id)
        : [...prev, deed.id]
    );
  };

  const submitDeeds = () => {
    selected.forEach((id) => {
      const deed = DEEDS.find((d) => d.id === id);
      onAddDeed({
        type: deed.type,
        timestamp: new Date().toISOString(),
      });
    });

    setSelected([]);
  };

  return (
    
    <section className="deeds-container">
      <h1 className="deeds-title">🎅 Log Today’s Good Deeds</h1>

      <div className="deeds-list">
        {DEEDS.map((deed) => (
          <div
            key={deed.id}
            className={`deed-card ${
              selected.includes(deed.id) ? "active" : ""
            }`}
            onClick={() => toggleDeed(deed)}
          >
            <input
              type="checkbox"
              checked={selected.includes(deed.id)}
              readOnly
            />
            <span>{deed.label}</span>
          </div>
        ))}

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
      </div>

      <button
        className="submit-btn"
        disabled={selected.length === 0}
        onClick={submitDeeds}
      >
        Save Deeds
      </button>
    </section>
  );
};

export default Deeds;
