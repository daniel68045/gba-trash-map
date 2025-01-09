import React from "react";

const Navbar = ({ toggleMode, isDarkMode }) => {
  return (
    <div className={`navbar ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
      <h2 className="navbar-title">Boston Trash Tracker</h2>
      <button className="navbar-toggle" onClick={toggleMode}>
        {isDarkMode ? "Day" : "Night"}
      </button>
    </div>
  );
};

export default Navbar;
