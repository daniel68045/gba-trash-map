import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./styles/Navbar.css";
import "./styles/Map.css";
import "./styles/Dashboard.css";
import "./styles/About.css";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [trashLogs, setTrashLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState("map");
  const [targetLocation, setTargetLocation] = useState(null);
  const [resetToHome, setResetToHome] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const lightModeStyle =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkModeStyle =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const toggleMode = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const toggleDashboard = useCallback(
    () => setIsDashboardOpen((prev) => !prev),
    []
  );

  const handleInfoClick = () => {
    setIsInfoVisible(true);
    setTimeout(() => setIsInfoVisible(false), 3000);
  };

  const locateMarker = useCallback((lat, lng) => {
    setTargetLocation({ lat, lng });
  }, []);

  const removeLog = useCallback(async (logId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/logs/${logId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the log.");
      }

      setTrashLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
    } catch (error) {
      console.error("Error deleting the log:", error.message);
    }
  }, []);

  const navigateHome = () => {
    setResetToHome(true);
    setTimeout(() => setResetToHome(false), 500);
  };
  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Navbar
        toggleMode={toggleMode}
        isDarkMode={isDarkMode}
        toggleDashboard={toggleDashboard}
        navigateToAbout={() => setCurrentPage("about")}
        navigateHome={navigateHome}
      />
      <Map
        mapStyle={isDarkMode ? darkModeStyle : lightModeStyle}
        isDarkMode={isDarkMode}
        setLogs={setTrashLogs}
        targetLocation={targetLocation}
        resetToHome={resetToHome}
        removeLog={removeLog}
        trashLogs={trashLogs}
        onInfoClick={handleInfoClick}
      />
      <Dashboard
        logs={trashLogs}
        isOpen={isDashboardOpen}
        locateMarker={locateMarker}
        removeLog={removeLog}
      />
      {currentPage === "about" && (
        <About navigateToMap={() => setCurrentPage("map")} />
      )}
      {isInfoVisible && (
        <div className="info-popup">
          Right click/hold down to add a new trash marker! <br />
          Initial requests can delay by <strong>50 seconds</strong> or more.
        </div>
      )}
    </div>
  );
};

export default App;
