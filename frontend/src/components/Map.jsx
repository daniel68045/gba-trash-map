import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LocateControl } from "leaflet.locatecontrol";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "../styles/Map.css";
import L from "leaflet";

const createCustomIcon = (theme) =>
  L.divIcon({
    html: `<div class="custom-map-marker ${theme}"></div>`,
    iconAnchor: [6, 6],
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
  const [tempMarker, setTempMarker] = useState(null);
  const [tempDescription, setTempDescription] = useState("");
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

  const MapEvents = () => {
    useMapEvents({
      contextmenu(e) {
        setTempMarker({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!tempMarker || !tempDescription) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: tempMarker.lat,
          longitude: tempMarker.lng,
          description: tempDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit trash log.");
      }

      const newLog = await response.json();
      setTrashLogs((prevLogs) => [...prevLogs, newLog]);
      setTempMarker(null);
      setTempDescription("");
    } catch (error) {
      console.error("Error submitting trash log:", error.message);
    }
  };

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
        <MapEvents />

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

        {tempMarker && (
          <Marker
            position={[tempMarker.lat, tempMarker.lng]}
            icon={createCustomIcon("temp-marker")}
          >
            <Popup>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Description:
                  <input
                    type="text"
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Submit</button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
