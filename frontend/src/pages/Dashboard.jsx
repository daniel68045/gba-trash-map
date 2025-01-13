import React, { useEffect } from "react";
import "../styles/Dashboard.css";
import "../styles/App.css";
const Dashboard = ({ logs, isOpen, locateMarker }) => {
  useEffect(() => {}, [logs, locateMarker]);

  if (!isOpen) return null;

  return (
    <div className="dashboard-container">
      <h3>Trash Logs</h3>
      <ul className="dashboard-log-list">
        {logs.map((log) => (
          <li key={log.id} className="dashboard-log-item">
            <p>
              <strong>Description:</strong> {log.description}
            </p>
            <p>
              <strong>Location:</strong> ({log.latitude}, {log.longitude})
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(log.created_at).toLocaleDateString()}
            </p>
            <button
              onClick={() => {
                if (locateMarker) {
                  locateMarker(log.latitude, log.longitude);
                } else {
                  console.error("locateMarker is not defined.");
                }
              }}
              className="shared-button"
            >
              Locate Marker
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Dashboard);
