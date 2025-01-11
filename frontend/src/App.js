import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Dashboard from "./pages/Dashboard";
import "./styles/Navbar.css";
import "./styles/Map.css";
import "./styles/Dashboard.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [trashLogs, setTrashLogs] = useState([]);

  const lightModeStyle =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkModeStyle =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Navbar
        toggleMode={toggleMode}
        isDarkMode={isDarkMode}
        toggleDashboard={toggleDashboard}
      />
      <Map
        mapStyle={isDarkMode ? darkModeStyle : lightModeStyle}
        isDarkMode={isDarkMode}
        setLogs={setTrashLogs}
      />
      <Dashboard logs={trashLogs} isOpen={isDashboardOpen} />
    </div>
  );
};

export default App;
