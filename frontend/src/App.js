import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import "./styles/Navbar.css";
import "./styles/Map.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightModeStyle =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const darkModeStyle =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Navbar toggleMode={toggleMode} isDarkMode={isDarkMode} />
      <Map
        mapStyle={isDarkMode ? darkModeStyle : lightModeStyle}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;
