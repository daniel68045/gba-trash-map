import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LocateControl } from "leaflet.locatecontrol";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "../styles/Map.css";
import L from "leaflet";

const createCustomIcon = (theme) =>
  L.divIcon({
    html: `<div class="custom-map-marker ${theme}"></div>`,
    iconAnchor: [12, 12],
  });

const LocateButton = ({ homeZoom }) => {
  const map = useMap();

  useEffect(() => {
    const locateControl = new LocateControl({
      position: "topleft",
      flyTo: true,
      keepCurrentZoomLevel: false,
      setView: true,
      showCompass: true,
      strings: {
        title: "Show me where I am!",
      },
      locateOptions: {
        maxZoom: homeZoom,
      },
    });

    locateControl.addTo(map);

    return () => {
      locateControl.remove();
    };
  }, [map, homeZoom]);

  return null;
};

const Map = ({ mapStyle, isDarkMode }) => {
  const [trashLogs, setTrashLogs] = useState([]);
  const homeCoords = [42.3601, -71.0589];
  const homeZoom = 13;

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/logs", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch trash logs: ${response.statusText}`);
        }
        const data = await response.json();
        setTrashLogs(data);
      } catch (error) {
        console.error("Error fetching trash logs:", error.message);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={homeCoords}
        zoom={homeZoom}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          url={mapStyle}
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>, <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        <LocateButton homeZoom={homeZoom} />

        <MarkerClusterGroup>
          {trashLogs.map((log) => (
            <Marker
              key={log.id}
              position={[log.latitude, log.longitude]}
              icon={createCustomIcon(theme)}
            >
              <Popup>
                <strong>{log.description}</strong>
                <br />
                Date: {new Date(log.created_at).toLocaleDateString()}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
