// Map integration with Leaflet

import React, { useEffect, useState } from "react";

const Map = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from the backend
    fetch("http://127.0.0.1:5000/logs")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setLogs(data))
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);

  return (
    <div>
      <h1>Trash Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.latitude}, {log.longitude}: {log.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
