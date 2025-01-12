import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./styles/Navbar.css";
import "./styles/Map.css";
import "./styles/Dashboard.css";
import "./styles/About.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [trashLogs, setTrashLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState("map");

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
      {currentPage === "map" && (
        <>
          <Navbar
            toggleMode={toggleMode}
            isDarkMode={isDarkMode}
            toggleDashboard={toggleDashboard}
            navigateToAbout={() => setCurrentPage("about")}
          />
          <Map
            mapStyle={isDarkMode ? darkModeStyle : lightModeStyle}
            isDarkMode={isDarkMode}
            setLogs={setTrashLogs}
          />
          <Dashboard logs={trashLogs} isOpen={isDashboardOpen} />
        </>
      )}
      {currentPage === "about" && (
        <About navigateToMap={() => setCurrentPage("map")} />
      )}
    </div>
  );
};

export default App;
