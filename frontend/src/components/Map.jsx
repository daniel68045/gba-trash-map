import React, { useEffect, useState, memo } from "react";
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
import "../styles/App.css";
import L from "leaflet";

const createCustomIcon = (theme) =>
  L.divIcon({
    html: `<div class="custom-map-marker ${theme}"></div>`,
    iconAnchor: [6, 6],
  });

const LocateToTarget = ({ targetLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (targetLocation) {
      const { lat, lng } = targetLocation;
      map.setView([lat, lng], 16, { animate: true });
    }
  }, [map, targetLocation]);

  return null;
};

const LocateButton = ({ homeZoom }) => {
  const map = useMap();

  useEffect(() => {
    const locateControl = new LocateControl({
      position: "topleft",
      flyTo: true,
      setView: "always",
      keepCurrentZoomLevel: false,
      initialZoomLevel: 16,
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

const TrashMarkers = memo(({ trashLogs, theme, removeLog }) => (
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
          <br />
          <button onClick={() => removeLog(log.id)} className="shared-button">
            Trash Gone?
          </button>
        </Popup>
      </Marker>
    ))}
  </MarkerClusterGroup>
));

const TemporaryMarker = memo(({ tempMarker, handleSubmit }) => {
  const [tempDescription, setTempDescription] = useState("");

  useEffect(() => {
    if (tempMarker) {
      setTempDescription("");
    }
  }, [tempMarker]);

  if (!tempMarker) return null;

  return (
    <Marker
      position={[tempMarker.lat, tempMarker.lng]}
      icon={createCustomIcon("temp-marker")}
    >
      <Popup>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(tempMarker, tempDescription);
          }}
        >
          <label>
            Description:
            <input
              type="text"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Popup>
    </Marker>
  );
});

const MapEvents = memo(({ setTempMarker }) => {
  useMapEvents({
    contextmenu(e) {
      setTempMarker({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
});

const Map = memo(
  ({ mapStyle, isDarkMode, setLogs, targetLocation, removeLog, trashLogs }) => {
    const [tempMarker, setTempMarker] = useState(null);
    const homeCoords = [42.3601, -71.0589];
    const homeZoom = 13;

    useEffect(() => {
      const fetchLogs = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/logs", {
            mode: "cors",
          });
          if (!response.ok) {
            throw new Error(
              `Failed to fetch trash logs: ${response.statusText}`
            );
          }

          const data = await response.json();
          setLogs(data);
        } catch (error) {
          console.error("Error fetching trash logs:", error.message);
        }
      };

      fetchLogs();
    }, [setLogs]);

    const handleSubmit = async (marker, description) => {
      try {
        const response = await fetch("http://127.0.0.1:5000/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: marker.lat,
            longitude: marker.lng,
            description: description,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit trash log: ${response.statusText}`);
        }

        const newLog = await response.json();
        setLogs((prevLogs) => [...prevLogs, newLog]);
        setTempMarker(null);
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
          <LocateToTarget targetLocation={targetLocation} />
          <MapEvents setTempMarker={setTempMarker} />
          <TrashMarkers
            trashLogs={trashLogs}
            theme={isDarkMode ? "dark" : "light"}
            removeLog={removeLog}
          />
          <TemporaryMarker
            tempMarker={tempMarker}
            setTempMarker={setTempMarker}
            handleSubmit={handleSubmit}
          />
        </MapContainer>
      </div>
    );
  }
);

export default Map;
