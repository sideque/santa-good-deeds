import React from "react";
import "../style.css";

const Navbar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "deeds", label: "Deeds" },
    { id: "analytics", label: "Analytics" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <header className="navbar">
      {/* <div style={{marginLeft:"100px"}}>
        🎅 <span>SantaVerse</span>
      </div> */}

      <nav className="navbar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
