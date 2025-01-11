import React from "react";

const Navbar = ({ toggleMode, isDarkMode }) => {
  return (
    <div className={`navbar ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
      <h2 className="navbar-title">The Greater Boston Area Trash Map</h2>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={() => alert("Navigate to About page")}>
          About
        </button>
        <button className="navbar-button" onClick={() => alert("Open Dashboard dropdown")}>
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
