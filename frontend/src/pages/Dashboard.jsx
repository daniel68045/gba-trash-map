import React from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ logs, isOpen }) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Dashboard);
