"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
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
  if (typeof window === "undefined") return;
  const [lat, lng] = coords;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=`;
  window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
};

// Fix for default markers in Leaflet with Next.js
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    Url:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-.png",
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
    className: "custom-div-icon",
  });

// Simple component to reset view when branches change
function MapUpdater({ filteredBranches, activeTab }) {
  const map = useMap();
  useEffect(() => {
    if (filteredBranches.length > 0) {
      map.setView([-26.5225, 31.4659], 9);
    }
  }, [filteredBranches, activeTab, map]);
  return null;
}

export default function BranchMap({ branches = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtering logic: purely based on departments
  const filteredBranches = branches.filter((branch) => {
    const departments = Array.isArray(branch.departments)
      ? branch.departments
      : String(branch.departments || "")
          .split(",")
          .map((d) => d.trim());

    if (activeTab === "All") return true;
    return departments.includes(activeTab);
  });

  // Branch statistics
  const getBranchStats = () => {
    const stats = {
      "Life Assurance": branches.filter((b) =>
        (Array.isArray(b.departments) ? b.departments : String(b.departments).split(",")).includes("Life Assurance")
      ).length,
      "General Insurance": branches.filter((b) =>
        (Array.isArray(b.departments) ? b.departments : String(b.departments).split(",")).includes("General Insurance")
      ).length,
      "United Pay": branches.filter((b) =>
        (Array.isArray(b.departments) ? b.departments : String(b.departments).split(",")).includes("United Pay")
      ).length,
    };
    return stats;
  };

  const branchStats = getBranchStats();
  const defaultCenter = [-26.5225, 31.4659];

  if (!isClient) {
    return (
      <div
        className="w-full bg-gray-200 flex items-center justify-center"
        style={{ height: "800px" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

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
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab ? DEPARTMENT_COLORS[tab] : "#f3f4f6",
              }}
            >
              {tab === "All"
                ? "All Branches"
                : `${tab} (${branchStats[tab]})`}
            </button>
          )
        )}
      </div>

      {/* Map Info */}
      <div className="text-center mb-4 text-sm text-gray-600">
        {activeTab === "Life Assurance" &&
          `Showing all ${branchStats["Life Assurance"]} Life Assurance branches nationwide`}
        {activeTab === "General Insurance" &&
          `Showing ${branchStats["General Insurance"]} General Insurance branches`}
        {activeTab === "United Pay" &&
          `Showing ${branchStats["United Pay"]} United Pay branches`}
        {activeTab === "All" &&
          "Showing all United Holdings branches and services"}
      </div>

      {/* Map Container */}
      <div className="relative border-2 h-full border-gray-300 rounded-lg overflow-hidden">
        <MapContainer
          center={defaultCenter}
          zoom={4}
          style={{
            height: "800px",
            width: "100%",
            background: "white",
            position: "relative",
            zIndex: 10,
          }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater
            filteredBranches={filteredBranches}
            activeTab={activeTab}
          />

          {filteredBranches.map((branch, idx) => (
            <Marker
              key={`${branch.name}-${idx}`}
              position={branch.coords}
              icon={createIcon(
                activeTab === "All"
                  ? DEPARTMENT_COLORS["All"]
                  : DEPARTMENT_COLORS[activeTab]
              )}
              eventHandlers={{
                click: () => openGoogleMaps(branch.coords, branch.name),
              }}
            >
              <Tooltip permanent={false} direction="top">
                <div className="text-sm max-w-xs">
                  <strong className="text-base">{branch.name}</strong>
                  <br />
                  📞 {branch.phone}
                  <br />
                  🕒 {branch.hours}
                  <br />
                  📍 {branch.region}
                  <br />
                  🏢 {Array.isArray(branch.departments)
                    ? branch.departments.join(", ")
                    : branch.departments}
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

     
    </div>
  );
}