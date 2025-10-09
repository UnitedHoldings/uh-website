"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEPARTMENT_COLORS = {
  "Life Assurance": "#3d834d",
  "General Insurance": "#286278",
  "United Pay": "#f79620",
  "All": "#9b1c20",
};

// Browser-safe function to open Google Maps
const openGoogleMaps = (coords, branchName) => {
  // Check if window is available (client-side only)
  if (typeof window === 'undefined') return;
  
  const [lat, lng] = coords;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=`;
  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
};

// Fix for default markers in Leaflet with Next.js
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Utility to create colored pin icons
const createIcon = (color) =>
  L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="5" fill="white"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    className: 'custom-div-icon'
  });

export default function BranchMap({ branches = [] }) {
  const [activeTab, setActiveTab] = useState("All");

  // Filter branches based on active tab
  const filteredBranches =
    activeTab === "All"
      ? branches
      : branches.filter((b) => b.departments.includes(activeTab));

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-4 gap-4 flex-wrap">
        {["All", "Life Assurance", "General Insurance", "United Pay"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition-colors font-semibold ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: activeTab === tab ? DEPARTMENT_COLORS[tab] : '#f3f4f6',
              }}
            >
              {tab === "All" ? "All Branches" : tab}
            </button>
          )
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={[-26.5, 31.4]}
        zoom={8}
        style={{
          height: "500px",
          width: "100%",
          background: "white",
          position: "relative",
          zIndex: 10,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredBranches.map((branch, idx) => (
          <Marker
            key={idx}
            position={branch.coords}
            icon={createIcon(
              activeTab === "All"
                ? DEPARTMENT_COLORS["All"]
                : DEPARTMENT_COLORS[activeTab]
            )}
            eventHandlers={{
              click: () => openGoogleMaps(branch.coords, branch.name)
            }}
          >
            <Tooltip>
              <div className="text-sm max-w-xs">
                <strong className="text-base">{branch.name}</strong>
                <br />
                📞 {branch.phone}
                <br />
                🕒 {branch.hours}
                <br />
                📍 {branch.region}
                <br />
                🏢 {branch.departments.join(", ")}
                <br />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoogleMaps(branch.coords, branch.name);
                  }}
                  className="mt-2 text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Get Directions
                </button>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}