import React from "react";

const Navbar = ({
  toggleMode,
  toggleDashboard,
  isDarkMode,
  navigateToAbout,
}) => {
  return (
    <div className={`navbar ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
      <h2 className="navbar-title">Trash Map of Greater Boston</h2>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={navigateToAbout}>
          About
        </button>
        <button className="navbar-button" onClick={toggleDashboard}>
          Dashboard
        </button>
        <button className="navbar-toggle" onClick={toggleMode}>
          {isDarkMode ? "Day" : "Night"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
